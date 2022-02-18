import { Request, Response } from "express";
import { ajaxSearch, getCategoriesWithCountQuery, postCategory, showCategory } from "../service/category.service";

const categoryAjaxSearch = async (req: Request, res: Response) => {
    return await ajaxSearch(req, res)
}

const create = async (req: Request, res: Response) => {
    let title = 'Create Category' 
    let err = req.session.errors
    return res.render('categories/create', { title, err })
}

const index = async (req: Request, res: Response) => {
    let title = 'Category list'
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus }
    let { keyword, page } = req.query as any 
    let pages = typeof page !== 'undefined' ? parseInt(page) : 1;
    let pathName:string = '/categories'
    let categories = await getCategoriesWithCountQuery(pages,keyword)
    return res.render('categories/index', { categories,pathName,title, keyword, alert })
}

const store = async (req: Request, res: Response) => {
    let model = await postCategory(req, res)
    if (model) {
        req.flash('alertMessage','Category successfully created')
        req.flash('alertStatus', 'success')
        res.redirect('/categories')
    } else {
        res.redirect('/categories/create')
    }
}

const show = async (req: Request, res: Response) => {
    let model = await showCategory(req,res)
    let title = 'Detail Category'
    return res.render('categories/show', { model, title })
}

export {
    categoryAjaxSearch,
    create,
    index,
    store,
    show
}
 
    //  /**
    //   * Display the specified resource.
    //   *
    //   * @param  int  $id
    //   * @return \Illuminate\Http\Response
    //   */
    //  public function show($id)
    //  {
    //      $category = \App\Category::findOrFail($id);
 
    //      return view('categories.show', ['category' => $category]);
    //  }
 
    //  /**
    //   * Show the form for editing the specified resource.
    //   *
    //   * @param  int  $id
    //   * @return \Illuminate\Http\Response
    //   */
    //  public function edit($id)
    //  {
    //      $category_to_edit = \App\Category::findOrFail($id);
 
    //      return view('categories.edit', ['category' => $category_to_edit]);
    //  }
 
    //  /**
    //   * Update the specified resource in storage.
    //   *
    //   * @param  \Illuminate\Http\Request  $request
    //   * @param  int  $id
    //   * @return \Illuminate\Http\Response
    //   */
    //  public function update (Request $request, $id){
    //      $category = \App\Category::findOrFail($id);
 
    //      \Validator::make($request->all(), [
    //        "name" => "required|min:3|max:20",
    //        "image" => "required",
    //        "slug" => [
    //          "required",
    //          Rule::unique("categories")->ignore($category->slug, "slug")
    //        ]
    //      ])->validate();
 
    //      $name = $request->get('name');
    //      $slug = $request->get('slug');
     
    //      $category->name = $name;
    //      $category->slug = $slug;
         
     
    //      if($request->file('image')){
    //          if($category->image && file_exists(storage_path('app/public/' . $category->image))){
    //              \Storage::delete('public/' . $category->name);
    //          }
     
    //          $new_image = $request->file('image')->store('category_images', 'public');
     
    //          $category->image = $new_image;
    //      }
 
    //      $category->updated_by = \Auth::user()->id;
 
    //      $category->slug = str_slug($name);
     
    //      $category->save();
 
    //      return redirect()->route('categories.edit', ['id' => $id])->with('status', 'Category successfully updated');
    //  }
 
    //  /**
    //   * Remove the specified resource from storage.
    //   *
    //   * @param  int  $id
    //   * @return \Illuminate\Http\Response
    //   */
    //  public function destroy($id)
    //  {
    //      $category = \App\Category::findOrFail($id);
 
    //      $category->delete();
       
    //      return redirect()->route('categories.index')
    //      ->with('status', 'Category successfully moved to trash');
    //  }
 
 
    //  public function trash(){
    //      $deleted_category = \App\Category::onlyTrashed()->paginate(10);
 
    //      return view('categories.trash', ['categories' => $deleted_category]);
    //  }
 
    //  public function restore($id){
    //      $category = \App\Category::withTrashed()->findOrFail($id);
 
    //      if($category->trashed()){
    //        $category->restore();
    //      } else {
    //        return redirect()->route('categories.index')
    //        ->with('status', 'Category is not in trash');
    //      }
       
    //      return redirect()->route('categories.index')
    //      ->with('status', 'Category successfully restored');
    //  }
 
    //  public function deletePermanent($id){
    //      $category = \App\Category::withTrashed()->findOrFail($id);
 
    //      if(!$category->trashed()){
    //        return redirect()->route('categories.index')
    //        ->with('status', 'Can not delete permanent active category');
    //      } else {
    //        $category->forceDelete();
           
    //        return redirect()->route('categories.index')
    //        ->with('status', 'Category permanently deleted');
    //      }
    //  }