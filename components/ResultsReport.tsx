import React from 'react';
import type { ResultsData } from '../types';
import { ARGENTINA_EMISSION_FACTOR, TREE_CO2_ABSORPTION } from '../constants';
import { TreeIcon } from './icons/TreeIcon';

interface ResultsReportProps {
    results: ResultsData;
    onReset: () => void;
}

const ResultCard: React.FC<{ title: string; value: string | number; unit: string; color: string }> = ({ title, value, unit, color }) => (
    <div className={`p-4 rounded-lg bg-opacity-10 border ${color}`}>
        <h4 className="text-sm font-medium text-slate-500">{title}</h4>
        <p className="text-3xl font-bold text-slate-800">
            {value} <span className="text-lg font-normal">{unit}</span>
        </p>
    </div>
);

export const ResultsReport: React.FC<ResultsReportProps> = ({ results, onReset }) => {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 animate-fade-in-slow">
            {/* Portada */}
            <div className="text-center border-b pb-6 mb-6">
                <h2 className="text-2xl font-bold text-green-800">TRABAJO PRÁCTICO Nº1 - Conciencia Personal</h2>
                <p className="text-slate-600 mt-1">Análisis de Emisiones de CO2eq y Compensación</p>
                <p className="text-sm text-slate-500 mt-2">Materia: Green Software</p>
            </div>

            {/* Datos Básicos */}
            <section className="mb-8">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">1. Datos Básicos Utilizados</h3>
                <ul className="list-disc list-inside space-y-2 bg-slate-50 p-4 rounded-md border">
                    <li><strong>Consumo de la Notebook:</strong> {results.notebookPower} Watts</li>
                    <li><strong>Horas de Uso Semanal:</strong> {results.totalWeeklyHours} horas</li>
                    <li><strong>Factor de Emisión (Argentina):</strong> {ARGENTINA_EMISSION_FACTOR} kg CO2eq/kWh</li>
                    <li><strong>Absorción de CO2 por Árbol (anual):</strong> {TREE_CO2_ABSORPTION} kg CO2</li>
                </ul>
            </section>

            {/* Cálculos */}
            <section className="mb-8">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">2. Cálculos Realizados</h3>
                <div className="space-y-3 text-sm">
                    <div className="p-3 bg-slate-50 rounded-md border">
                        <p><strong>Consumo Energético Anual (kWh):</strong></p>
                        <p className="text-slate-600 font-mono text-xs sm:text-sm">({results.notebookPower}W * {results.totalWeeklyHours}h/sem * 52sem) / 1000 = <strong className="text-green-700">{results.annualKWh} kWh/año</strong></p>
                    </div>
                     <div className="p-3 bg-slate-50 rounded-md border">
                        <p><strong>Emisiones Anuales de CO2eq (kg):</strong></p>
                        <p className="text-slate-600 font-mono text-xs sm:text-sm">{results.annualKWh} kWh/año * {ARGENTINA_EMISSION_FACTOR} kg/kWh = <strong className="text-green-700">{results.annualCO2eq} kg CO2eq/año</strong></p>
                    </div>
                </div>
            </section>

            {/* Resultado */}
            <section className="mb-8">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">3. Resultado Final</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ResultCard title="Emisiones Anuales" value={results.annualCO2eq} unit="kg CO2eq" color="border-orange-300 bg-orange-100" />
                    <ResultCard title="Árboles para Compensar" value={results.treesNeeded} unit="árboles/año" color="border-green-300 bg-green-100" />
                </div>
            </section>
            
            {/* Animación Final */}
            <section className="mt-10 text-center">
                 <div className="flex flex-col items-center justify-center p-6 bg-green-50/50 rounded-xl border-2 border-dashed border-green-200">
                    <TreeIcon className="h-24 w-24 text-green-600 animate-grow-bounce" />
                    <h3 className="text-lg font-semibold text-green-800 mt-4">¡Un Pequeño Gesto, un Gran Impacto!</h3>
                    <p className="text-slate-600 mt-2 max-w-md mx-auto">
                        Al entender tu huella digital, ya estás contribuyendo a un futuro más sostenible. Cada acción cuenta.
                    </p>
                </div>
            </section>

            <div className="mt-10 text-center">
                <button
                    onClick={onReset}
                    className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300 transition-colors duration-300"
                >
                    Calcular de Nuevo
                </button>
            </div>
        </div>
    );
};