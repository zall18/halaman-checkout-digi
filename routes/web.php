<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    $serviceId = $request->query('service_id');

    // TODO [BE]: Lookup product data dari DB/API berdasarkan $serviceId
    // Contoh:
    //   $product = Product::where('slug', $serviceId)->first();
    //   $productName = $product?->name;
    //   $price = $product?->price ?? 0;
    //
    // Untuk sekarang pakai default (FE akan handle fallback)
    $productName = null;  // BE isi dari DB nanti
    $price = 0;           // BE isi dari DB nanti (satuan Rupiah, bilangan bulat)

    return Inertia::render('checkout/page', [
        'service_id'   => $serviceId,
        'product_name' => $productName,
        'price'        => $price,
    ]);
})->name('checkout.show');

// Alias /checkout → redirect ke / dengan query params
Route::get('/checkout', function (Request $request) {
    return redirect()->route('checkout.show', ['service_id' => $request->query('service_id')]);
});
