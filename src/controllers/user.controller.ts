import { Request, Response } from "express";
import { destroyUser, editUser, getUsersWithCountQuery, postUser, putUser } from "../service/user.service";

const index = async (req: Request, res: Response) => {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }
    let { status, keyword, page } = req.query as any 
    let pages = typeof page !== 'undefined' ? parseInt(page) : 1;
    let users = await getUsersWithCountQuery(pages,keyword,status) 
    let title = 'Users list'
    console.log(users)
    return res.render('users/index', { keyword,alert, status, users, title })
}

const create = async (req: Request, res: Response) => {
    let err = req.session.errors
    let title = 'Create New User'
    
    return res.render('users/create', { title, err })
}

const store = async (req: Request, res: Response) => {
    let model = await postUser(req, res)
    if(model){
        req.flash('alertMessage','User successfully created')
        req.flash('alertStatus', 'success')
        res.redirect('/users')
    }else{
        return res.redirect('/users/create')
    }
}

const edit = async (req: Request, res: Response) => {
    let user = await editUser(req,res)
    let err = req.session.errors
    let title = 'Edit User'
    return res.render('users/edit', { user, err, title})
}

const show = async (req: Request, res: Response) => {
    let user = await editUser(req,res)
    let title = 'Detail user'
    return res.render('users/show', { user, title})
}

const update = async (req: Request, res: Response) => {
    let model = await putUser(req,res)
    if(model){
        req.flash('alertMessage','User successfully updated')
        req.flash('alertStatus', 'success')
        res.redirect('/users')
    }else{
        return res.redirect('/users/edit/'+ req.params.id)
    }
}

const destroy = async (req: Request, res: Response) => {
    let model = await destroyUser(req,res)
    if(model){
        req.flash('alertMessage','User successfully delete')
        req.flash('alertStatus', 'success')
        res.redirect('/users')
    }else{
        req.flash('alertMessage','Error Something Went Wrong')
        req.flash('alertStatus', 'danger')
        res.redirect('/users')
    }
}

export {
    index,
    store,
    create,
    edit,
    show,
    update,
    destroy
}
//     public function index(Request $request)
//     {

//         $filterKeyword = $request->get('keyword');

//         $status = $request->get('status');

//         if($status){
//             $users = \App\User::where('status', $status)->paginate(10);
//         } else {
//             $users = \App\User::paginate(10);
//         }

//         if($filterKeyword){
//             if($status){
//                 $users = \App\User::where('email', 'LIKE', "%$filterKeyword%")
//                     ->where('status', $status)
//                     ->paginate(10);
//             } else {
//                 $users = \App\User::where('email', 'LIKE', "%$filterKeyword%")
//                     ->paginate(10);
//             }
//         }

        
    
//         return view('users.index', ['users' => $users]);
//     }




//     /**
//      * Update the specified resource in storage.
//      *
//      * @param  \Illuminate\Http\Request  $request
//      * @param  int  $id
//      * @return \Illuminate\Http\Response
//      */
//     public function update(Request $request, $id)
//     {
//         \Validator::make($request->all(), [
//             "name" => "required|min:5|max:100",
//             "roles" => "required",
//             "phone" => "required|digits_between:10,12",
//             "address" => "required|min:20|max:200",
//         ])->validate();

//         $user = \App\User::findOrFail($id);

//         $user->name = $request->get('name');
//         $user->roles = json_encode($request->get('roles'));
//         $user->address = $request->get('address');
//         $user->phone = $request->get('phone');
//         $user->status = $request->get('status');

//         if($request->file('avatar')){
//             if($user->avatar && file_exists(storage_path('app/public/' . $user->avatar))){
//                 \Storage::delete('public/'.$user->avatar);
//             }
//             $file = $request->file('avatar')->store('avatars', 'public');
//             $user->avatar = $file;
//         }

//         $user->save();

//         return redirect()->route('users.edit', ['id' => $id])->with('status', 'User succesfully updated');
//     }

//     /**
//      * Remove the specified resource from storage.
//      *
//      * @param  int  $id
//      * @return \Illuminate\Http\Response
//      */
//     public function destroy($id)
//     {
//         $user = \App\User::findOrFail($id);

//         $user->delete();

//         return redirect()->route('users.index')->with('status', 'User successfully deleted');
//     }
// }