from rest_framework import serializers

class BaseSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    