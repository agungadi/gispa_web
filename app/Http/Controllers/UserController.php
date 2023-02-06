<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use App\Http\Controllers\AppBaseController;
use App\DataTable\UserDataTable;
use Spatie\Permission\Models\Role;

use Hash;
use DB;

class UserController extends AppBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $roles = Role::pluck('name', 'id');

        if ($request->ajax()) {
            return DataTables::of((new UserDataTable())->get($request->only(['unit_opd'])))->make(true);
        }
        return view('admin.user.index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $this->validate($request, [
            'nama' => 'required',
            'no_hp' => 'required',
            'roles' => 'required',
            'email' => 'required|email|unique:users,email',
            'username' => 'required',
            'password' => 'required|same:password_confirmation',
        ]);

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $user->assignRole($request->input('roles'));

        return $this->sendResponse($user, 'Users berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $query = DB::table("model_has_roles")->where("model_id", $id)->get();

        $array = json_decode(json_encode($query), true);

        $role_id = $array[0]['role_id'];

        $json = User::query()->select('users.id', 'users.nama',  'users.email', 'users.no_hp',  'users.username', 'roles.name as RoleName', 'model_has_roles.role_id', 'model_has_roles.model_id')
        ->join('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
        ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')
        ->where('roles.id', $role_id)
        ->where('model_has_roles.model_id', $id)
        ->get();


        return $this->sendResponse($json, 'User successfully retrieved.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $this->validate($request, [
            'nama' => 'required',
            'no_hp' => 'required',
            'roles' => 'required',
            'email' => 'required|email',
            'username' => 'required',
        ]);

        $input = $request->all();
        // if(!empty($input['password'])){
        //     $input['password'] = Hash::make($input['password']);
        // }else{
        //     $input = Arr::except($input,array('password'));
        // }

        $user = User::find($id);
        $user->update($input);
        DB::table('model_has_roles')->where('model_id',$id)->delete();

        $user->assignRole($request->input('roles'));

        return $this->sendSuccess('User berhasil diubah.');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        User::find($id)->delete();

        return $this->sendSuccess('User berhasil dihapus.');
    }
}
