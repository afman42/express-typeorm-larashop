import { Request, Response } from "express";
import { indexOrder, updateOrder } from "../service/edit.service";

const index = async (req: Request, res: Response) => {
    let title = 'Orders list'
    let orders = await  indexOrder(req,res);
    return res.render('orders/index',{ title, orders })
}

const edit = async (req: Request, res: Response) => {
    let order = await updateOrder(req,res)
    let title = 'Edit order' 
    return res.render('orders/edit', { order, title })
}

const update = async (req: Request, res: Response) => {

}

export {
    index,
    edit,
    update
}
//     public function index(Request $request)
//     {
//         $status = $request->get('status');
//         $buyer_email = $request->get('buyer_email');


//         $orders = \App\Order::with('user')
//                     ->with('books')
//                     ->whereHas('user', function($query) use ($buyer_email) {
//                         $query->where('email', 'LIKE', "%$buyer_email%");
//                     })
//                     ->where('status', 'LIKE', "%$status%")
//                     ->paginate(10);
        
//         return view('orders.index', ['orders' => $orders]);
//     }


//     /**
//      * Show the form for editing the specified resource.
//      *
//      * @param  int  $id
//      * @return \Illuminate\Http\Response
//      */
//     public function edit($id)
//     {
//         $order = \App\Order::findOrFail($id);

//         return view('orders.edit', ['order' => $order]);
//     }

//     /**
//      * Update the specified resource in storage.
//      *
//      * @param  \Illuminate\Http\Request  $request
//      * @param  int  $id
//      * @return \Illuminate\Http\Response
//      */
//     public function update(Request $request, $id){
//         $order = \App\Order::findOrFail($id);
      
//         $order->status = $request->get('status');

//         $order->save();
      
//         return redirect()->route('orders.edit', ['id' => $order->id])->with('status', 'Order status succesfully updated');
//     }
