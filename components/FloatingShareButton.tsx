import React, { useState } from 'react';
import { Share2, Link as LinkIcon, X } from 'lucide-react';
import { COLORS } from '../constants';

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

export const FloatingShareButton: React.FC<{ hasCart?: boolean }> = ({ hasCart }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when clicking outside (simple backdrop)
    const handleClose = () => setIsOpen(false);

    const handleWhatsApp = () => {
        const text = encodeURIComponent(`¡Hola! Mira este delicioso menú de Chicken's Lei: ${window.location.href}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
        handleClose();
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('¡Enlace copiado al portapapeles!');
        } catch (err) {
            console.error('Error al copiar link:', err);
        }
        handleClose();
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Chicken's Lei - Menú",
                    text: "¡Mira este delicioso menú!",
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        }
        handleClose();
    };

    return (
        <>
            {/* Backdrop for closing the menu */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity"
                    onClick={handleClose}
                />
            )}

            <div className={`fixed right-4 z-50 flex flex-col items-end gap-3 transition-all duration-300 pointer-events-none ${hasCart ? 'bottom-32' : 'bottom-6'}`}>

                {/* Menu Items */}
                <div className={`flex flex-col gap-2 transition-all duration-300 origin-right ${isOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-8 pointer-events-none'
                    }`}>
                    {/* WhatsApp */}
                    <button
                        onClick={handleWhatsApp}
                        className="flex items-center justify-end gap-3 group bg-white hover:bg-green-50 text-stone-800 p-2 pl-4 rounded-l-full shadow-lg border border-stone-100 transition-all hover:pr-5"
                    >
                        <span className="font-medium text-sm text-green-700">WhatsApp</span>
                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center p-1.5 shadow-md group-hover:scale-110 transition-transform">
                            <WhatsAppIcon />
                        </div>
                    </button>

                    {/* Copy Link */}
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center justify-end gap-3 group bg-white hover:bg-stone-50 text-stone-800 p-2 pl-4 rounded-l-full shadow-lg border border-stone-100 transition-all hover:pr-5"
                    >
                        <span className="font-medium text-sm text-stone-600">Copiar Link</span>
                        <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center p-1.5 shadow-md group-hover:scale-110 transition-transform">
                            <LinkIcon size={16} />
                        </div>
                    </button>

                    {/* Native Share */}
                    {navigator.share && (
                        <button
                            onClick={handleNativeShare}
                            className="flex items-center justify-end gap-3 group bg-white hover:bg-blue-50 text-stone-800 p-2 pl-4 rounded-l-full shadow-lg border border-stone-100 transition-all hover:pr-5"
                        >
                            <span className="font-medium text-sm text-blue-600">Más opciones</span>
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center p-1.5 shadow-md group-hover:scale-110 transition-transform">
                                <Share2 size={16} />
                            </div>
                        </button>
                    )}
                </div>

                {/* Main Floating Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 z-50 hover:shadow-2xl hover:brightness-110"
                    style={{ backgroundColor: isOpen ? '#444' : COLORS.orangeVibrant }}
                    aria-label={isOpen ? "Cerrar menú compartir" : "Compartir página"}
                >
                    {isOpen ? <X size={24} /> : <Share2 size={24} />}
                </button>
            </div>
        </>
    );
};
