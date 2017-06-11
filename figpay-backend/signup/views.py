from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from profiles.forms import ConsumerForm
from profiles.models import Consumer
from django.contrib.auth import login, authenticate


def signup(request):
    if request.method == 'POST':
        form = ConsumerForm(request.POST, request.FILES)
        if form.is_valid():
            newuser = form.save()
            pin = str(form.cleaned_data.pop('pin'))
            # image = form.cleaned_data.pop('image')
            first_name = form.cleaned_data.pop('first_name')
            last_name = form.cleaned_data.pop('last_name')
            consumer = Consumer(user=newuser, pin=pin, image_1=request.FILES['image'], first_name=first_name,
                                last_name=last_name)
            consumer.save()
            # username = form.cleaned_data.get('username')
            # raw_password = form.cleaned_data.get('password1')
            # user = authenticate(username=username, password=raw_password)
            # login(request, user)
            return redirect('signup-success')
    else:
        form = ConsumerForm()
    return render(request, 'signup/signup.html', {'form': form})


class SignupSuccess(TemplateView):
    template_name = 'signup/signup-success.html'
