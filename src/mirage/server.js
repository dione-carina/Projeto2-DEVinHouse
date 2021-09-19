import { createServer, Model } from 'miragejs'

createServer({
    models: {
        message: Model,
        trigger: Model,
        channel: Model,
    },
    seeds(server) {
        server.create("message", { canal: "sms",        gatilho: "abertura_conta conta",    tempo: "15:00", mensagem: "Na correria do dia a dia a Oi Conta Zap te ajuda a lembrar de algumas coisinhas! Ja conseguiu pagar seu boleto? Se sim, desconsidere a mensagem" })
        server.create("message", { canal: "sms",        gatilho: "fez_pix",                 tempo: "05:00", mensagem: "Na correria do dia a dia a Oi Conta Zap te ajuda a lembrar de algumas coisinhas! Ja conseguiu pagar seu boleto? Se sim, desconsidere a mensagem" })
        server.create("message", { canal: "whatsapp",   gatilho: "abertura_conta",          tempo: "73:00", mensagem: "Na correria do dia a dia a Oi Conta Zap te ajuda a lembrar de algumas coisinhas! Ja conseguiu pagar seu boleto? Se sim, desconsidere a mensagem" })
        server.create("message", { canal: "whatsapp",   gatilho: "criou_chave_pix",         tempo: "12:00", mensagem: "Vi que você criou um chave?" })
        server.create("message", { canal: "email",      gatilho: "fez_pix",                 tempo: "23:23", mensagem: "Vi que você criou um chave?" })
        server.create("trigger", { name: "abertura_conta" })
        server.create("trigger", { name: "fez_pix" })
        server.create("trigger", { name: "recarregou_celular" })
        server.create("trigger", { name: "alterou_dados_pessois" })
        server.create("trigger", { name: "consultou_saldo" })
        server.create("trigger", { name: "fex_transferencia_outro_banco" })
        server.create("trigger", { name: "deletou_chave_pix" })
        server.create("trigger", { name: "criou_chave_pix" })
        server.create("trigger", { name: "falou_com_atendimento" })
        server.create("channel", { name: "email" })
        server.create("channel", { name: "whatsapp" })
        server.create("channel", { name: "sms" })
    },
    routes() {
        this.namespace = "api"


        this.get("/gatilhos", (schema, request) => {
            return schema.triggers.all(); 
        })

        this.get("/canais", (schema, request) => {
            return schema.channels.all(); 
        })

        this.get("/mensagens", (schema, request) => {
            return schema.messages.all(); 
        })

        this.post("/mensagens", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            return schema.messages.create(attrs);
        })
        this.delete("/mensagens/:id", (schema, request) => {
            let id = request.params.id
            return schema.messages.find(id).destroy()
        })
        this.get("/mensagens/:id", (schema, request) => {
            let id = request.params.id
            return schema.messages.find(id)
        })


    },
})