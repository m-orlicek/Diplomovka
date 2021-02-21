//mocking
import { Server, Model } from 'miragejs'

export function makeServer({ environment = "development" } = {}) {

    let server = new Server({
        environment,

        models: {
            event: Model,
        },

        seeds(server) {
            server.create("event", {
                name: "Testik name",
                details: "Testik details",
                start: "2021-02-01 10:10",
                end: "2021-02-01 10:15",
                color: "#28b8ce"
            });
            server.create("event", {
                name: "Testik name",
                details: "Testik details",
                start: "2021-03-01 10:10",
                end: "2021-03-01 10:15",
                color: "#28b8ce"
            })
        },

        routes() {

            this.namespace = "api"

            this.get("/events", schema => {
                return schema.events.all()
            })

            this.post('/events', (schema, request) => {
                const task = JSON.parse(request.requestBody).data
                return server.create("event", task)
            })

            this.delete('/events/:id', (schema, request) => {
                const id = request.params.id
                return schema.events.find(id).destroy()
            })
        },
    })

    return server
}
