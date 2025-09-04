
import React from 'react';

interface IntroductionProps {
    onStart: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onStart }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Bienvenido al Trabajo Práctico Nº1: Conciencia Personal</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Esta herramienta te guiará paso a paso para completar tu asignación. Registrarás el consumo de tu notebook, calcularemos juntos las emisiones de CO2 y descubriremos cuántos árboles se necesitan para compensarlas.
            </p>
            <div className="prose prose-slate max-w-none text-left bg-slate-50 p-6 rounded-lg border">
                <h3 className="font-semibold">Requerimientos del Trabajo Práctico:</h3>
                <ol>
                    <li>Diseñar una herramienta y registrar el consumo de energía de tu notebook durante una semana.</li>
                    <li>Calcular los kilos de CO2eq emitidos por año, usando el factor de emisión de Argentina.</li>
                    <li>Calcular la cantidad de árboles necesarios para compensar tus emisiones.</li>
                </ol>
            </div>
            <button
                onClick={onStart}
                className="mt-8 bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                Comenzar
            </button>
        </div>
    );
};
