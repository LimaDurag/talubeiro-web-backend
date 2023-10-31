var jsonBanco = {
    "tabuleiro": {
        "locais": [
            {
                "id": 1,
                "nome": "Partida",
                "type": "start",
                "color": "null"
            },
            {
                "id": 2,
                "nome": "Leblon",
                "type": "location",
                "color": "#be2edd"
            },
            {
                "id": 3,
                "nome": "Sorte/Revés",
                "type": "luck",
                "color": "null"
            },
            {
                "id": 4,
                "nome": "Avenida Presidente Vargas",
                "type": "location",
                "color": "#be2edd"
            },
            {
                "id": 5,
                "nome": "Av. Nossa Senhora de Copacabana",
                "type": "location",
                "color": "#be2edd"
            },
            {
                "id": 6,
                "nome": "Companhia Ferroviária",
                "type": "company",
                "color": "null"
            },
            {
                "id": 7,
                "nome": "Avenida Brigadeiro Faria Lima",
                "type": "location",
                "color": "#7ed6df"
            },
            {
                "id": 8,
                "nome": "Companhia de Viação",
                "type": "company",
                "color": "null"
            },
            {
                "id": 9,
                "nome": "Avenida Rebouças",
                "type": "location",
                "color": "#7ed6df"
            },
            {
                "id": 10,
                "nome": "Avenida 9 de Julho",
                "type": "location",
                "color": "#7ed6df"
            },
            {
                "id": 11,
                "nome": "Cadeia",
                "type": "prison",
                "color": "null"
            },
            {
                "id": 12,
                "nome": "Avenida Europa",
                "type": "location",
                "color": "#e056fd"
            },
            {
                "id": 13,
                "nome": "Sorte/Revés",
                "type": "luck",
                "color": "null"
            },
            {
                "id": 14,
                "nome": "Rua Augusta",
                "type": "location",
                "color": "#e056fd"
            },
            {
                "id": 15,
                "nome": "Avenida Pacaembu",
                "type": "location",
                "color": "#e056fd"
            },
            {
                "id": 16,
                "nome": "Companhia de Táxi",
                "type": "company",
                "color": "null"
            },
            {
                "id": 17,
                "nome": "Sorte/Revés",
                "type": "luck",
                "color": "null"
            },
            {
                "id": 18,
                "nome": "Interlagos",
                "type": "location",
                "color": "#f0932b"
            },
            {
                "id": 19,
                "nome": "Sorte/Revés",
                "type": "luck",
                "color": "null"
            },
            {
                "id": 20,
                "nome": "Morumbi",
                "type": "location",
                "color": "#f0932b"
            },
            {
                "id": 21,
                "nome": "Parada Livre",
                "type": "vacation",
                "color": "null"
            },
            {
                "id": 22,
                "nome": "Bangu",
                "type": "location",
                "color": "#eb4d4b"
            },
            {
                "id": 23,
                "nome": "Sorte/Revés",
                "type": "luck",
                "color": "null"
            },
            {
                "id": 24,
                "nome": "Botafogo",
                "type": "location",
                "color": "#eb4d4b"
            },
            {
                "id": 25,
                "nome": "Imposto de Renda",
                "type": "loss",
                "color": "null"
            },
            {
                "id": 26,
                "nome": "Companhia de Navegação",
                "type": "company",
                "color": "null"
            },
            {
                "id": 27,
                "nome": "Av. Brasil",
                "type": "location",
                "color": "#f9ca24"
            },
            {
                "id": 28,
                "nome": "Sorte/Revés",
                "type": "luck",
                "color": "null"
            },
            {
                "id": 29,
                "nome": "Avenida Paulista",
                "type": "location",
                "color": "#f9ca24"
            },
            {
                "id": 30,
                "nome": "Jardim Europa",
                "type": "location",
                "color": "#f9ca24"
            },
            {
                "id": 31,
                "nome": "Vá para a Prisão",
                "type": "prison",
                "color": "null"
            },
            {
                "id": 32,
                "nome": "Copacabana",
                "type": "location",
                "color": "#6ab04c"
            },
            {
                "id": 33,
                "nome": "Companhia de Aviação",
                "type": "company",
                "color": "null"
            },
            {
                "id": 34,
                "nome": "Avenida Vieira Souto",
                "type": "location",
                "color": "#6ab04c"
            },
            {
                "id": 35,
                "nome": "Avenida Atlântica",
                "type": "location",
                "color": "#6ab04c"
            },
            {
                "id": 36,
                "nome": "Companhia de Táxi Aéreo",
                "type": "company",
                "color": "null"
            },
            {
                "id": 37,
                "nome": "Ipanema",
                "type": "location",
                "color": "#6ab04c"
            },
            {
                "id": 38,
                "nome": "Sorte/Revés",
                "type": "luck",
                "color": "null"
            },
            {
                "id": 39,
                "nome": "Jardim Paulista",
                "type": "location",
                "color": "#4834d4"
            },
            {
                "id": 40,
                "nome": "Brooklin",
                "type": "location",
                "color": "#4834d4"
            }

        ]
    },
    "players": [
        {
            "id": 1,
            "uid": "",
            "money": 0,
            "properties": []
        }
    ]
}

var newJson = jsonBanco.tabuleiro.locais.map((casa) => {
    if (casa.type === "location") {
        return {
            ...casa,
            ownerId: null,
            level: 1,
            upgradeCost: []
        }
    }else{
        return casa
    }
})

import FileSystem from 'fs';
 FileSystem.writeFile('file.json', JSON.stringify(newJson), (error) => {
    if (error) throw error;
  });