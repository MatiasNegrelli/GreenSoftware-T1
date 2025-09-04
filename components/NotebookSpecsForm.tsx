import React, { useState } from 'react';
import { LaptopIcon } from './icons/LaptopIcon';

interface NotebookSpecsFormProps {
    onSubmit: (power: number) => void;
    initialPower: number;
}

export const NotebookSpecsForm: React.FC<NotebookSpecsFormProps> = ({ onSubmit, initialPower }) => {
    const [power, setPower] = useState<number>(initialPower);
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (power > 0 && power < 500) {
            onSubmit(power);
        } else {
            setError('Por favor, ingrese un valor válido (entre 1 y 499 Watts).');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        const value = parseInt(e.target.value, 10);
        setPower(isNaN(value) ? 0 : value);
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 animate-fade-in">
            <form onSubmit={handleSubmit}>
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <LaptopIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800">Paso 1: Datos de tu Notebook</h2>
                    <p className="mt-2 text-slate-500">
                        Ingresa el consumo de energía de tu notebook en Watts (W).
                    </p>
                </div>
                
                <div className="mt-8 max-w-xs mx-auto">
                    <label htmlFor="power" className="sr-only">
                        Consumo de energía (Watts)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            name="power"
                            id="power"
                            value={power || ''}
                            onChange={handleChange}
                            className="w-full text-center text-5xl font-bold py-4 px-12 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 transition"
                            placeholder="65"
                            aria-describedby="power-unit"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl font-medium text-slate-400 pointer-events-none" id="power-unit">
                            W
                        </span>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
                    <p className="mt-3 text-center text-sm text-slate-500">
                        Consejo: Puedes encontrar este valor en el cargador. Un valor común es 65W o 90W.
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <button
                        type="submit"
                        className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Siguiente Paso
                    </button>
                </div>
            </form>
        </div>
    );
};