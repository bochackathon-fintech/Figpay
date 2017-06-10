from rest_framework import serializers

from .models import Upload
from drf_extra_fields.fields import Base64ImageField


class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upload
        read_only_fields = ('created_on', 'recognized_user_id', 'owner', 'url', 'recognition_successful')

class UploadedBase64ImageSerializer(serializers.Serializer):
    file = Base64ImageField(required=True)