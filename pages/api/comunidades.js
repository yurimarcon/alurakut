import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        // const TOKEN = '3a9782340b8b4df0d359bb792b880b';
        const TOKEN = '390bd1c307916cab66520194ec06df';
        const client = new SiteClient(TOKEN);
        
        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "974880", // ID do Model de "Communities" criado pelo Dato
            ...request.body,
            // "title":"teste",
            // "imageUrl":"https://picsum.photos/1234",
            // "creatorslug":"yurimarcon"
        })
    
        console.log(registroCriado);
    
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}