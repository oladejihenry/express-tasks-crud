import { defineFeature, loadFeature } from 'jest-cucumber'
import request from 'supertest';
import app from '../app'

const agent = request(app)

const feature = loadFeature('app/test/features/task.feature')


defineFeature(feature, (test) => {
    test('Create a new task', ({ given, when, then }) => {
        given('I have no tasks', async () => {
            await agent.delete('/api/tasks/clear')
        })
       
        let response: any

        when('I create a task', async () => {
            response = await agent.post('/api/tasks')
            .send({ title: 'Test Task', description: 'Test Description' })
        })
        then('I should see the task', () => {
            expect(response.status).toBe(200)
        })
    })

    test('Get all tasks', ({ given, when, then }) => {
        given('I have a task', async () => {
            await agent.post('/api/tasks').send({ title: 'Test Task', description: 'Test Description' })
        })

        let response: any
        when('I get all tasks', async () => {
            response = await agent.get('/api/tasks')
        })

        then('I should see the task', () => {
            expect(response.status).toBe(200)
            expect(response.body.length).toBeGreaterThan(1)
        })
    })

    test('Update a task', ({ given, when, then }) => {
        let taskId: number
        let response: any

        given('I have a task', async () => {
            await agent.delete('/api/tasks/clear')
            const response = await agent.post('/api/tasks').send({ title: 'Test Task', description: 'Test Description' })
            taskId = response.body.id
        })

        when('I update the task', async () => {
            response = await agent.put(`/api/tasks/${taskId}`).send({ title: 'Updated Task', description: 'Updated Description' })
        })

        then('I should see the task', () => {
            expect(response.status).toBe(200)
        })
    })

    test('Delete a task', ({ given, when, then }) => {
        let taskId: number
        let response: any

        given('I have a task', async () => {
            await agent.delete('/api/tasks/clear')
            const response = await agent.post('/api/tasks').send({ title: 'Test Task', description: 'Test Description' })
            taskId = response.body.id
        })

        when('I delete the task', async () => {
            response = await agent.delete(`/api/tasks/${taskId}`)
        })

        then('I should see the task', () => {
            expect(response.status).toBe(200)
        })
    })
})