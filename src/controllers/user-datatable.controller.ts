import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { datatableUser } from "../service/datatable.service";

const users = async (req: Request, res: Response) => {
    let title = 'Datatable Index'
    let pathName = '/datatable/users'
    return res.render('datatables/users', { title, pathName })
}

const data = async (req: Request, res: Response) => {
    let tables: string = "users";
    // let cari: Array<string> = ['judul'];
    let cari: Array<string> = ['name'];
    let isWhere: Array<string> | null = null;
    // let isWhere = 'artikel.deleted_at IS NULL';
    res.setHeader('Content-Type','application/json')
    let model = await datatableUser(req,res,tables,cari,isWhere)
    console.log(model)
    return model
}

const test = async (req: Request, res: Response) => {
    const user = await getRepository(User).query(`SELECT COUNT(*) as total FROM users`)
    return res.json(user)
}

export {
    users,
    data,
    test 
}

//     public function data(){
//         return Datatables::of(User::query())
//                ->addColumn('action', function($item){
//                   return '
//                    <a href="'.route('users.edit', ['id' => $item->id]).'" class="btn btn-sm btn-primary">Edit</a> 
//                    <a href="'.route('users.edit', ['id' => $item->id]).'" class="btn btn-sm btn-info">Detail</a>
//                    <form onsubmit="return confirm(\'Delete this user permanently?\')" class="d-inline" action="'.route('users.destroy', ['id' => $item->id ]) . '" method="POST">
//                         <input type="hidden" name="_token" value="'.csrf_token().'"/>
//                         <input type="hidden" name="_method" value="DELETE">
                        
//                         <input type="submit" value="Delete" class="btn btn-danger btn-sm">
//                     </form>
//                 ';
//                })
//                ->make(true);
//     }
// }