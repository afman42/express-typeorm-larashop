import { createConnection } from "typeorm"
import { exec } from 'child_process'
import util from 'util'
const execut = util.promisify(exec);
jest.setTimeout(10000)

beforeAll(async () => {
    const {stdout, stderr } = await execut('ts-node node_modules/.bin/typeorm migration:run')

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
})

describe('Test Example',() => {
    test('Example',() => {
        expect('hello').toEqual('hello')
    })
})

afterAll( async done => {
    // await createConnection().then(async connection => {
    const {stdout, stderr } = await execut('ts-node node_modules/.bin/typeorm migration:revert')

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    //     await connection.close();
        
    //     done();
    
    // }, error => console.log("Cannot connect: ", error)); 
    done()
})