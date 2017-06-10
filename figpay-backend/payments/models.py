# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.db import models
import uuid
from profiles.models import Consumer, Vendor
import http.client, urllib.request, urllib.parse, urllib.error, base64

class PointOfSale(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vendor = models.ForeignKey(Vendor)
    description = models.TextField(blank=True)

    def __str__(self):
        return str(self.id)


class Payment(models.Model):

    VISA = 'vi'
    BOCAPI = 'ap'

    TYPE_CHOICES = (
            (VISA, 'Visa'),
            (BOCAPI, 'BoC API'),
        )

    created_on = models.DateTimeField(auto_now_add=True)
    pos = models.ForeignKey(PointOfSale, related_name='payments')
    consumer = models.ForeignKey(Consumer, related_name='payments')

    amount = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True)
    is_fulfilled = models.BooleanField(blank=True, default=False)
    response = models.TextField(blank=True)
    type = models.CharField(
            max_length=2,
            choices=TYPE_CHOICES,
            default=BOCAPI,
        )

    def __str__(self):
        return str(self.created_on)

    def send_payment(self):
        headers = {
                # Request headers
                'Track-ID': '111111111111111111111111',
                'Auth-Provider-Name': '01040951662400',
                'Auth-ID': '123456789',
                'Content-Type': 'application/json',
        }

        params = json.dumps({

            'description': "EMVASMA 12 EUROS",
             "challenge_type": "string",
            'from': {
                'account_id': 'bda8eb884efcea209b2a6240',
                'bank_id': 'bda8eb884efcef7082792d45'
            },
            'to': {
                'account_id': 'bda8eb884efcea209b2a62a5',
                'bank_id': 'bda8eb884efcef7082792d45'
            },
             "value": {
               "currency": 'EUR',
               "amount": 12.00
             }
        })

        try:
            conn = http.client.HTTPConnection('api.bocapi.net')
            #http://api.bocapi.net/v1/api/banks/{BANK_ID}/accounts/{ACCOUNT_ID}/make-transaction[?subscription-key]
            conn.request("POST", "/v1/api/banks/bda8eb884efcef7082792d45/accounts/bda8eb884efcea209b2a6240/make-transaction?subscription-key=dc4d6d144a9c41d5be483dd563c5a21d", params, headers)
            response = conn.getresponse()
            data = response.read()
            print(data)
            conn.close()

        except Exception as e:
            print("[Errno {0}] {1}".format(e.errno, e.strerror))