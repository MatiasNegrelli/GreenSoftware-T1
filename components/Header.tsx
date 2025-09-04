
import React from 'react';
import { LeafIcon } from './icons/LeafIcon';

export const Header: React.FC = () => {
    return (
        <header className="w-full max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4">
                 <LeafIcon className="h-10 w-10 text-green-600" />
                 <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
                    Calculadora de Huella de Carbono
                </h1>
            </div>
            <p className="mt-2 text-lg text-slate-600">
                Una herramienta para el curso de Green Software
            </p>
        </header>
    );
};
