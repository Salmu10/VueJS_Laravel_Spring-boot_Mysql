<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Table;
use App\Models\Category;
use App\Http\Resources\TableResource;
use App\Http\Requests\StoreTableRequest;
use App\Http\Requests\UpdateTableRequest;

class TableController extends Controller
{
    public function index() {
        return TableResource::collection(Table::all());
    }
    
    public function store(StoreTableRequest $request) {

        $data = $request->except(['categories']);
        $categories = Category::whereIn('category_name', $request->categories)->get();
        $id_categories = [];
        
        foreach ($categories as $c) {
            array_push($id_categories, $c->id);
        }

        if (count($id_categories) > 0) {
            $table = Table::create($data);
            $table->categories()->sync($id_categories);
            return TableResource::make($table);
        } else {
            return response()->json([ "Status" => "Not found" ], 404);
        }
    }

    public function show($id) {
        return TableResource::make(Table::where('id', $id)->firstOrFail());
    }

    public function update(UpdateTableRequest $request, $id) {

        $data = $request->except(['categories']);
        $categories_name = [];

        if ($request->categories !== null) {
            $categories_name = $request->categories;
        }

        $categories = Category::whereIn('category_name', $categories_name)->get();
        $id_categories = [];

        foreach ($categories as $c) {
            array_push($id_categories, $c->id);
        }

        $update = Table::where('id', $id)->update($data);

        if ($update == 1) {
            if (count($id_categories) > 0) {
                $table = Table::where('id', $id)->firstOrFail();
                $table->categories()->detach();
                $table->categories()->sync($id_categories);
            }
            return response()->json([ "Message" => "Updated correctly" ], 200);
        } else {
            return response()->json([ "Status" => "Not found" ], 404);
        };
    }

    public function destroy($id) {

        $delete = Table::where('id', $id)->delete();

        if ($delete == 1) {
            return response()->json([ "Message" => "Deleted correctly" ], 200);
        } else {
            return response()->json([ "Status" => "Not found" ], 404);
        }
    }
}
