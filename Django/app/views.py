from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
        "Endpoint": '/notes/',
        "method":'GET'
        }
    ]
    return Response(routes)


@api_view(['GET','POST'])
def getTasks(request):
    if request.method == 'POST':
        data = request.data
        task = Task.objects.create(
            text = data['text'],
            day = data['day'],
            reminder = data['reminder']
        )
        print(task)
        serializer = TaskSerializer(task , many = False)
        return Response(serializer.data)
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks , many = True)
    return Response(serializer.data)

@api_view(['DELETE','PUT'])
def getTask(request , pk):
    # if request.method == 'PUT':
    #     data = request.data
    #     task = Task.objects.get(id = pk)
    #     print(task)
    #     serializer = TaskSerializer(task , data = request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #     return Response(serializer.data)
    if request.method == 'PUT':
        task = Task.objects.get(id = pk)
        if task.reminder == True:
            task.reminder = False
        else:
            task.reminder = True
        task.save()
        serializer = TaskSerializer(task , many = False)
        
        return Response(serializer.data)
        
    task = Task.objects.get(id = pk)
    task.delete()
    serializer = TaskSerializer(task , many = False)
    return Response(serializer.data)


    