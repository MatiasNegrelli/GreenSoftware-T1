import React, { useState, useEffect } from 'react';

interface WeeklyUsageFormProps {
    onSubmit: (usage: number[]) => void;
    onBack: () => void;
}

const daysOfWeek = ["Día 1", "Día 2", "Día 3", "Día 4", "Día 5", "Día 6", "Día 7"];

const isValidSavedUsage = (data: any): data is (number | null)[] => {
    return Array.isArray(data) && data.length === 7 && data.every(item => typeof item === 'number' || item === null);
};

export const WeeklyUsageForm: React.FC<WeeklyUsageFormProps> = ({ onSubmit, onBack }) => {
    const [dailyUsage, setDailyUsage] = useState<(number | null)[]>(Array(7).fill(null));
    const [error, setError] = useState<string>('');

    useEffect(() => {
        try {
            const savedUsage = localStorage.getItem('dailyUsage');
            if (savedUsage) {
                const parsedUsage = JSON.parse(savedUsage);
                if (isValidSavedUsage(parsedUsage)) {
                    setDailyUsage(parsedUsage);
                }
            }
        } catch (e) {
            console.error("Failed to parse daily usage from localStorage", e);
        }
    }, []);

    const handleUsageChange = (index: number, value: string) => {
        const newUsage = [...dailyUsage];
        
        if (value === '') {
            newUsage[index] = null;
            setError('');
        } else {
            const hours = parseInt(value, 10);
            if (isNaN(hours) || hours < 0 || hours > 24) {
                setError(`Las horas deben estar entre 0 y 24.`);
            } else {
                setError('');
                newUsage[index] = hours;
            }
        }
        
        setDailyUsage(newUsage);
        localStorage.setItem('dailyUsage', JSON.stringify(newUsage));
    };
    
    const handleClearData = () => {
        const clearedUsage = Array(7).fill(null);
        setDailyUsage(clearedUsage);
        localStorage.removeItem('dailyUsage');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalUsage = dailyUsage.map(h => h ?? 0);
        if (dailyUsage.some(h => h === null)) {
            setError('Por favor, completa el registro de los 7 días.');
            return;
        }
        if (error) {
            return;
        }
        onSubmit(finalUsage);
    };
    
    const completedDays = dailyUsage.filter(d => d !== null).length;
    const allDaysFilled = completedDays === 7;
    const totalHours = dailyUsage.reduce((acc, curr) => acc + (curr ?? 0), 0);

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 animate-fade-in">
            <form onSubmit={handleSubmit}>
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-800">Paso 2: Registro de Uso Semanal</h2>
                    <p className="mt-2 text-slate-500">
                        Ingresa cuántas horas usaste tu notebook cada día. Tu progreso se guardará automáticamente.
                    </p>
                </div>
                
                <div className="mt-6">
                     <div className="flex justify-between items-center mb-4">
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(completedDays / 7) * 100}%` }}></div>
                        </div>
                        <span className="ml-4 text-sm font-medium text-slate-600 whitespace-nowrap">{completedDays} / 7 días</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="flex flex-col items-center p-3 bg-slate-50 rounded-lg border-2 border-slate-200 transition-all duration-200 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 hover:border-green-400">
                            <label htmlFor={`day-${index}`} className="block text-sm font-medium text-slate-700 mb-1">
                                {day}
                            </label>
                            <div className="flex items-baseline">
                                <input
                                    type="number"
                                    id={`day-${index}`}
                                    value={dailyUsage[index] ?? ''}
                                    onChange={(e) => handleUsageChange(index, e.target.value)}
                                    className="w-16 bg-transparent text-center text-3xl font-bold text-green-700 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    min="0"
                                    max="24"
                                    placeholder="0"
                                />
                                <span className="text-lg font-medium text-slate-400">hs</span>
                            </div>
                        </div>
                    ))}
                </div>

                {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
                
                <div className="mt-8 text-center bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-slate-600">Total de horas semanales registradas:</p>
                    <p className="text-2xl font-bold text-green-700">{totalHours} horas</p>
                </div>

                <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                         <button
                            type="button"
                            onClick={onBack}
                            className="font-medium text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            &larr; Volver al Paso 1
                        </button>
                        <button
                            type="button"
                            onClick={handleClearData}
                            className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
                        >
                            Limpiar registro
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={!allDaysFilled}
                        className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:bg-slate-400"
                    >
                        Calcular Resultados
                    </button>
                </div>
            </form>
        </div>
    );
};