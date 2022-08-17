from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import AppUser, Pet, Base, User, Walk, Walker
from django.contrib.auth import authenticate, login as auth_login, logout
from django.core import serializers
from django.forms.models import model_to_dict
import json

#returns static index.html page for REACT rendering
def index(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

#POST: creates new User object from user input fields, returns success/failure message to client 
@api_view(['POST'])
def signup(request):
    set_email = request.data['email']
    set_first_name = request.data['firstName']
    set_last_name = request.data['lastName']
    set_address = request.data['address']
    set_password = request.data['password']
    set_zip = request.data['zip']
    if request.data['role'] == 'User':
        set_is_user = True
        set_is_provider = False
    else:
        set_is_provider = True
        set_is_user = False

    try:
        new_user = User.objects.create_user(
            username=set_email,
            email=set_email,
            password=set_password,
            first_name=set_first_name,
            last_name=set_last_name,
            address=set_address,
            zip_code=set_zip,
            is_provider=set_is_provider,
            is_user=set_is_user)

        if (set_is_user):
            new_app_user = AppUser(user=new_user)
        else:
            new_app_user = Walker(user=new_user)

        new_app_user.full_clean()
        new_app_user.save()

    except BaseException as e:
        print(e)
        return JsonResponse({'data': 'Failure: User already exists!!'})

    return JsonResponse({'data': 'success'})

#POST: logs in/authenticates user with entered credentials, returns success/failure message to client
@api_view(['POST'])
def login(request):

    set_email = request.data['email']
    set_password = request.data['password']

    user = authenticate(
        username=request.data['email'],
        password=request.data['password'])

    print(user)

    if user is not None:
        if user.is_active:
            try:
                auth_login(request._request, user)
            except Exception as e:
                print('except')
                print(str(e))
            return JsonResponse({'data': 'success'})

        else:
            return JsonResponse({'data': 'not active!'})

    else:
        return JsonResponse({'data': 'no user!'})

#POST: logs out requesting user
@api_view(['POST'])
def log_out(request):
    logout(request)
    return JsonResponse({'data': 'Logged you out!'})

#GET: returns serialized User object of the requesting user
@api_view(['GET'])
def check_user(request):
    if request.user.is_authenticated:
        data = serializers.serialize("json",
                                     [request.user],
                                     fields=['id',
                                             'email',
                                             'first_name',
                                             'last_name',
                                             'is_provider',
                                             'pets',
                                             'address',
                                             'bases',
                                             'bio',
                                             'rate',
                                             'zip_code'])
        return HttpResponse(data)
    else:
        return JsonResponse({'user': None})

#POST: creates new Pet object with requesting user as owner
@api_view(['POST'])
def add_pet(request):
    pet_name = request.data['name']
    pet_species = request.data['species']
    pet_weight = request.data['weight']
    pet_age = request.data['age']
    pet_owner = User.objects.all().get(email=request.data['owner'])
    pet = Pet(
        name=pet_name,
        species=pet_species,
        weight=pet_weight,
        age=pet_age,
        owner=pet_owner)
    try:
        pet.full_clean()
        pet.save()
    except Exception as e:
        print(e)
    return JsonResponse({'data': 'success'})

#GET: returns serialized Pet objects of all requesting user's pets
@api_view(['GET'])
def check_pets(request):
    if request.user.is_authenticated:
        pets = Pet.objects.all().filter(owner=request.user)
        data = serializers.serialize("json", pets)
        return HttpResponse(data)
    else:
        return HttpResponse('failure')

#POST: adds Base to requesting user's User object with base name passed in request
@api_view(['POST'])
def add_base(request):
    check_base = Base.objects.all().get(name=request.data['name'])
    check_user = User.objects.all().get(email=request.data['user'])
    check_user.bases.add(check_base)

    return JsonResponse({'data': 'success'})

#GET: returns serialzed Base objects of all requesting user's bases
@api_view(['GET'])
def check_bases(request):
    if request.user.is_authenticated:
        bases = list(request.user.bases.all())
        data = serializers.serialize("json", bases)
        return HttpResponse(data)
    else:
        return HttpResponse('failure')

#GET: returns all pet providers connected to bases that the request user is also connected to 
@api_view(['GET'])
def connect_pal(request):
    if request.user.is_authenticated:
        pals = []
        emails = []
        bases = list(request.user.bases.all())
        for base in bases:
            pals.append(
                list(
                    User.objects.filter(
                        is_provider=True).filter(
                        bases__id=base.id)))

        for pal in pals:

            for value in pal:
                value_bases = list(value.bases.all())
                print(list(map(lambda base: base.name, value_bases)))
                pal_email = {'key': value.pk,
                             'email': value.email,
                             'first_name': value.first_name,
                             'last_name': value.last_name,
                             'bio': value.bio,
                             'rate': value.rate,
                             'bases': list(map(lambda base: base.name,
                                               value_bases))}
                emails.append(pal_email)
        print(emails)
        return JsonResponse({'data': emails})
    else:
        return HttpResponse("no user")

#GET: returns serialized User object of user whose ID is passed as argument
#PUT: updates User object of user whose ID is passed as argument with fields passed in request body
@api_view(['GET', 'PUT'])
def user_detail(request, user_id):
    if request.user.is_authenticated:

        if request.method == 'GET':
            target_user = User.objects.all().get(pk=user_id)
            data = serializers.serialize(
                "json",
                [target_user],
                fields=[
                    'email',
                    'first_name',
                    'last_name',
                    'is_provider',
                    'pets',
                    'address',
                    'bases',
                    'rate',
                    'bio',
                    'zip_code'],
                use_natural_foreign_keys=True)
            return HttpResponse(data)

        if request.method == 'PUT':
            target_user = request.user
            rate = ""
            if target_user.is_provider:
                rate = request.data['rate']
            try:
                target_user.email = request.data['email']
                target_user.first_name = request.data['firstName']
                target_user.last_name = request.data['lastName']
                target_user.address = request.data['address']
                target_user.zip_code = request.data['zip']
                target_user.bio = request.data['bio']
                target_user.rate = rate
                target_user.full_clean()
                target_user.save()
            except Exception as e:
                HttpResponse(e)
            return HttpResponse('success')

#PUT: connects request user to walker whose email/username is passed in request body
@api_view(['PUT'])
def connect_provider(request):
    if request.user.is_authenticated:
        body = json.loads(request.body)
        app_user = AppUser.objects.all().get(user=request.user)
        connect_walker = Walker.objects.all().get(
            user__email=body["provider"]["email"])
        app_user.walker = connect_walker
        try:
            app_user.full_clean()
            app_user.save()
        except Exception as e:
            print(e)
        return HttpResponse('okay')
    return HttpResponse('no user')

#GET: returns serialized User object of pet provider connected to request user
@api_view(['GET'])
def get_provider(request):
    if request.user.is_authenticated:
        app_user = AppUser.objects.all().get(user=request.user)
        walker = app_user.walker
        if walker is None:
            return HttpResponse("no walker")
        check_walker = walker.user
        return JsonResponse(
            model_to_dict(
                check_walker,
                fields=[
                    'id',
                    'email',
                    'first_name',
                    'last_name',
                    'bio',
                    'rate']))

#POST: creates new Walk object from fields passed in request body
@api_view(['POST'])
def schedule_walk(request):
    if request.user.is_authenticated:
        walker = request.data['walker']
        pet_list = request.data['pets']
        date = request.data['date']
        time = request.data['time']
        connect_walker = Walker.objects.all().get(user__email=walker["email"])
        try:
            walk = Walk(
                walker=connect_walker,
                date=date,
                walk_time=time,
                owner=request.user)
            walk.full_clean()
            walk.save()
            for pet_id in pet_list:
                pet = Pet.objects.all().get(pk=pet_id)
                walk.pets.add(pet)
            walk.full_clean()
            walk.save()
        except Exception as e:
            return HttpResponse('failure')
            print(e)

        return HttpResponse('okay')

#GET: returns Walk objects of all request user's pets
@api_view(['GET'])
def get_pet_walks(request):
    if request.user.is_authenticated:
        return_list = []
        walks = list(
            Walk.objects.all().filter(
                owner=request.user).filter(
                complete=False))
        for walk in walks:
            walk_pets = list(walk.pets.all())
            return_list.append({'id': walk.id, 'pets': list(map(
                lambda pet: pet.name, walk_pets)), "date": walk.date, "time": walk.walk_time})
        return JsonResponse(return_list, safe=False)

#GET: returns request user's connected pet provider
@api_view(['GET'])
def check_connections(request):
    if request.user.is_authenticated:
        return_list = []
        app_users = list(
            AppUser.objects.all().filter(
                walker__user=request.user))
        for app_user in app_users:
            return_list.append({'id': app_user.user.id,
                                'first_name': app_user.user.first_name,
                                'last_name': app_user.user.last_name,
                                'email': app_user.user.email,
                                'address': app_user.user.address})
        return JsonResponse(return_list, safe=False)

#GET: returns all Walk objects associated with requesting pet provider
@api_view(['GET'])
def get_provider_walks(request):
    if request.user.is_authenticated:
        return_list = []
        check_walker = Walker.objects.all().get(user=request.user)
        walks = list(
            Walk.objects.all().filter(
                walker=check_walker).filter(
                complete=False))
        for walk in walks:
            walk_pets = list(walk.pets.all())
            return_list.append({'id': walk.id, 'pets': list(map(
                lambda pet: pet.name, walk_pets)), "date": walk.date, "time": walk.walk_time})
        return JsonResponse(return_list, safe=False)

#GET: returns Walk object associated with passed ID
@api_view(['GET'])
def get_walk(request, walk_id):
    if request.user.is_authenticated:
        walk = Walk.objects.all().get(pk=walk_id)
        walk_pets = list(walk.pets.all())
        owner = walk.owner
        walker = walk.walker
        walker_name = walker.user.first_name + " " + walker.user.last_name
        name = owner.first_name + " " + owner.last_name
        return JsonResponse({'id': walk.id,
                             'pets': list(map(lambda pet: pet.name,
                                              walk_pets)),
                             "date": walk.date,
                             "time": walk.walk_time,
                             "owner": name,
                             "notes": walk.notes,
                             "walk_length": walk.walk_length,
                             "walker": walker_name},
                            safe=False)

#PUT: updates Walk object after it is completed by pet provider
@api_view(['PUT'])
def complete_walk(request):
    if request.user.is_authenticated:
        walk_length = request.data['walk_length']
        notes = request.data['notes']
        walk_time = request.data['walk_time']
        walk_id = request.data['walk_id']
        try:
            walk = Walk.objects.all().get(pk=walk_id)
            walk.walk_length = walk_length
            walk.notes = notes
            walk.walk_time = walk_time
            walk.complete = True
            walk.full_clean()
            walk.save()
        except Exception as e:
            print(e)
            return HttpResponse(e)
        return HttpResponse('success')

#GET: returns all completed walk associated with request user
@api_view(['GET'])
def get_completed_walks(request):
    if request.user.is_authenticated:
        return_list = []
        walks = list(
            Walk.objects.all().filter(
                owner=request.user).filter(
                complete=True))
        for walk in walks:
            walk_pets = list(walk.pets.all())
            return_list.append({'id': walk.id, 'pets': list(map(
                lambda pet: pet.name, walk_pets)), "date": walk.date, "time": walk.walk_time})
        return JsonResponse(return_list, safe=False)

#GET: returns Pet object associated with ID passed as argument
#PUT: updates Pet object associated with ID passed as argument with fields pass in request body
@api_view(['GET', 'PUT'])
def pet_detail(request, pet_id):
    if request.user.is_authenticated:
        target_pet = Pet.objects.all().get(pk=pet_id)

        if request.method == 'GET':
            return JsonResponse(
                model_to_dict(
                    target_pet,
                    fields=[
                        'id',
                        'name',
                        'species',
                        'weight',
                        'age']))

        if request.method == 'PUT':
            try:
                target_pet.name = request.data['name']
                target_pet.species = request.data['species']
                target_pet.weight = request.data['weight']
                target_pet.age = request.data['age']
                target_pet.full_clean()
                target_pet.save()
            except Exception as e:
                return HttpResponse(e)
            return HttpResponse('success')
