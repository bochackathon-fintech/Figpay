# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import mixins
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from .serializers import ConsumerPaymentSerializer, VendorPaymentSerializer
from profiles.models import Consumer
from .models import Payment


class ConsumerPaymentViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class = ConsumerPaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.consumer.payments.all()


class VendorPaymentViewset(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                           viewsets.GenericViewSet):
    serializer_class = VendorPaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(pos__vendor__user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pin = serializer.validated_data['pin']  # request.POST.get('pin', '')

        consumer = serializer.validated_data['consumer']
        if pin != str(consumer.pin):
            return Response({'success': False, 'error': 'Bad Authorization Parameters'},
                            status=status.HTTP_403_FORBIDDEN)

        # transaction

        payment = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        payment.notify_for_checking_on_fb()

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()
