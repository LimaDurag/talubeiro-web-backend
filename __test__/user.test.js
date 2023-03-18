import request from 'supertest';
const baseURL = "http://localhost:3001/api/"
/**
 * API MUST BE RUNNING IN PARALLEL
 *-------------------------------------------------- 
 * SCRIPTS (UNDER package.json) MUST CONTAIN:
      "test": "jest"
 *-------------------------------------------------- 
 * MUST CONTAIN ARCHIVE .babelrc ON SRC WITH: 
   {
    "presets":["@babel/preset-env"]
    }
 *--------------------------------------------------  
 * USING
     "@babel/preset-env": "^7.20.2"
     "jest": "^29.5.0"
    "supertest": "^6.3.3"
 */
describe('Users test', () =>{
    var lastid
    var body = 
    {
        "name": "João Zézinho",
        "email": "test@email.com",
        "senha": "12345"
    }
    //CREATE
    it("POST USER should return 201", async () => {
        const response = await request(baseURL).post("User/").send(body);
        expect(response.statusCode).toBe(201);
        lastid=response.body.id
        expect(response.body.id.isNan==false)
        expect(response.body.name=="João Zezinho")
        expect(response.body.email=="test@email.com")
        expect(response.body.senha=="12345")
        expect(response.body.status=="ACTIVATE")
        console.log("CREATE WORKING AND RETURNING CREATED OBJECT")
    });
    //UPDATE
    it("UPDATE USER 1 should return 200", async () => {
        body = 
        {
            "id": "1",
            "name": "João Zézinho changed",
            "email": "test@email.com changed",
            "senha": "12345 changed",
        }
        const response = await request(baseURL).put("User/1").send(body);
        expect(response.statusCode).toBe(200);
        expect(response.body.id==1)
        expect(response.body.name=="João Zezinho changed")
        expect(response.body.email=="test@email.com changed")
        expect(response.body.senha=="12345 changed")
        expect(response.body.status=="ACTIVATE")
    });
    //DEACTIVATE
    it("DEACTIVATE USER 1 should return 200", async () => {
        const response = await request(baseURL).put("User/1/deactivate");
        expect(response.statusCode).toBe(200);
        expect(response.body.id==1)
        expect(response.body.name=="João Zezinho")
        expect(response.body.email=="test@email.com")
        expect(response.body.senha=="12345")
        expect(response.body.status=="DEACTIVATE")
    });
    //GET 1
    it("GET USER 1 should return 200", async () => {
        const response = await request(baseURL).get("User/1");
        expect(response.statusCode).toBe(200);
        expect(response.body.id==1)
        expect(response.body.name=="João Zezinho")
        expect(response.body.email=="test@email.com")
        expect(response.body.senha=="12345")
        expect(response.body.status=="DEACTIVATE")
        expect(!response.body.createdAt==null)
        expect(!response.body.updatedAt==null)
    });
    //GET ALL
    it("GET ALL USERS should return 200", async () => {
        const response = await request(baseURL).get("User/");
        expect(response.statusCode).toBe(200);        
        
        expect(Object.keys(response.body).length==lastid)
    });
})