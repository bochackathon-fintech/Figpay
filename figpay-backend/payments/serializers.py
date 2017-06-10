from rest_framework import serializers
from .models import Payment


class ConsumerPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['created_on', 'pos', 'consumer', 'amount', 'description']


class VendorPaymentSerializer(serializers.ModelSerializer):
    pin = serializers.CharField(write_only=True)

    class Meta:
        model = Payment
        fields = ['created_on', 'pos', 'consumer', 'pin', 'amount', 'description']

    def create(self, validated_data):
        pin = validated_data.pop('pin')
        # user = User.objects.create(**validated_data)
        # Profile.objects.create(user=user, **profile_data)
        return super(VendorPaymentSerializer, self).create(validated_data)
