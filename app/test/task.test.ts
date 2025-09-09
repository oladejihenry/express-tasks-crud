import request from 'supertest'
import app from '../app'


describe('Task API', () => {
    beforeAll(async () => {
        await request(app).delete('/api/tasks/clear')
    })

    it('should create a task', async () => {
        const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task', description: 'Test Description' })
        expect(response.status).toBe(200)
        expect(response.body.title).toBe('Test Task')
        expect(response.body.description).toBe('Test Description')
    })

    it('should get all tasks', async () => {
        const response = await request(app).get('/api/tasks')
        expect(response.status).toBe(200)
    })

    it('should update a task', async () => {
        const response = await request(app)
        .put('/api/tasks/1')
        .send({ title: 'Updated Task', description: 'Updated Description' })
        expect(response.status).toBe(200)
    })

    it('should delete a task', async () => {
        const response = await request(app).delete('/api/tasks/1')
        expect(response.status).toBe(200)
    })

    afterAll(async () => {
        const response = await request(app).delete('/api/tasks/clear')
        expect(response.status).toBe(200)
    })
})
