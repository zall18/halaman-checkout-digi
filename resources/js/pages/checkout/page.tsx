import { FormEvent, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CheckoutProps {
    service_id?: string | null;
    product_name?: string | null;
    price?: number; // dalam rupiah (bilangan bulat), default 0
}

export default function CheckoutPage({ service_id, product_name, price = 0 }: CheckoutProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState(false);

    // Format service_id to readable product name as fallback
    const getProductName = (name?: string | null, id?: string | null) => {
        if (name) return name;
        if (!id) return 'Produk Digital KelasDigi';

        return id
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Format angka ke format Rupiah (contoh: 149000 → "Rp 149.000")
    const formatRupiah = (amount: number) => {
        return 'Rp ' + amount.toLocaleString('id-ID');
    };

    const productName = getProductName(product_name, service_id);
    const formattedPrice = formatRupiah(price);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            toast.success('Berhasil checkout! Pesanan akan diproses.');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white pb-24 lg:pb-0">
            <Head title="Checkout" />

            {/* Header Branding */}
            <header className="w-full bg-white border-b border-neutral-100 animate-fade-in-up">
                <div className="max-w-6xl mx-auto flex items-center">
                    <img src="/logo.png" alt="KelasDigi" className="w-50 object-contain" />
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-10 md:py-14">
                <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Left Column - Billing Details */}
                    <div className="lg:col-span-7 space-y-7 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="border-b border-neutral-200 pb-4">
                            <h2 className="text-2xl font-bold text-neutral-800">Informasi Pemesan</h2>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-base font-medium text-neutral-700">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Masukkan nama lengkap Anda"
                                    autoComplete="name"
                                    className="h-12 border-neutral-300 focus-visible:ring-[#4A3AFF] focus-visible:border-[#4A3AFF] rounded-md transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-base font-medium text-neutral-700">
                                    Alamat Email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="email@contoh.com"
                                    autoComplete="email"
                                    className="h-12 border-neutral-300 focus-visible:ring-[#4A3AFF] focus-visible:border-[#4A3AFF] rounded-md transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-base font-medium text-neutral-700">
                                    Telephone <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="081234567890"
                                    pattern="[0-9]*"
                                    title="Hanya masukkan angka"
                                    className="h-12 border-neutral-300 focus-visible:ring-[#4A3AFF] focus-visible:border-[#4A3AFF] rounded-md transition-all duration-200"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary (Desktop) */}
                    <div className="lg:col-span-5 relative hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="border-2 border-neutral-100 p-6 md:p-8 rounded-lg bg-white shadow-sm sticky top-6">
                            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Pesanan Anda</h2>

                            <div className="space-y-4 text-neutral-700">
                                <div className="flex justify-between border-b border-neutral-200 pb-4 font-bold text-neutral-900">
                                    <span>Produk</span>
                                    <span>Subtotal</span>
                                </div>

                                <div className="flex justify-between py-2 items-start">
                                    <span className="pr-4">{productName} <span className="text-neutral-500 font-medium">× 1</span></span>
                                    <span className="font-medium whitespace-nowrap">{formattedPrice}</span>
                                </div>

                                <div className="flex justify-between py-4 border-t border-b border-neutral-200 font-medium">
                                    <span>Subtotal</span>
                                    <span>{formattedPrice}</span>
                                </div>

                                <div className="flex justify-between py-2 font-bold text-lg text-neutral-900">
                                    <span>Total</span>
                                    <span>{formattedPrice}</span>
                                </div>
                            </div>

                            <div className="mt-8 space-y-5">


                                <Button
                                    type="submit"
                                    className="btn-glow w-full h-14 text-lg font-bold text-white rounded-md tracking-wide cursor-pointer"
                                    style={{ backgroundColor: '#4A3AFF' }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'MEMPROSES...' : 'CHECKOUT'}
                                </Button>
                            </div>
                        </div>
                    </div>

                </form>
            </main>

            {/* Floating Mobile Order Summary */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 animate-slide-up">
                {/* Expanded Detail */}
                {mobileExpanded && (
                    <div
                        className="bg-white border-t border-neutral-200 px-4 pt-4 pb-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
                        onClick={() => setMobileExpanded(false)}
                    >
                        <div className="space-y-2 text-sm text-neutral-700">
                            <div className="flex justify-between font-medium">
                                <span>{productName} × 1</span>
                                <span>{formattedPrice}</span>
                            </div>
                            <div className="flex justify-between border-t border-neutral-100 pt-2 font-bold text-neutral-900">
                                <span>Total</span>
                                <span>{formattedPrice}</span>
                            </div>
                        </div>

                        <div className="mt-3 bg-neutral-50 p-3 rounded text-xs text-neutral-500 leading-relaxed">
                            Transfer Bank Manual — Rekening akan ditampilkan setelah checkout.
                        </div>

                        {/* Trust Badges Mobile */}
                        <div className="flex items-center justify-center gap-4 pt-3 pb-1 text-neutral-400 text-[10px]">
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                Aman
                            </span>
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
                                Garansi
                            </span>
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                                Instan
                            </span>
                        </div>
                    </div>
                )}

                {/* Sticky Bottom Bar */}
                <div className="bg-white border-t border-neutral-200 px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setMobileExpanded(!mobileExpanded)}
                        className="flex-1 text-left"
                    >
                        <p className="text-xs text-neutral-500">Total</p>
                        <p className="text-lg font-bold text-neutral-900">{formattedPrice}</p>
                    </button>
                    <Button
                        type="submit"
                        form="checkout-form"
                        className="btn-glow h-12 px-8 text-base font-bold text-white rounded-md cursor-pointer"
                        style={{ backgroundColor: '#4A3AFF' }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Memproses...' : 'Checkout'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
