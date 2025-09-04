import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Introduction } from './components/Introduction';
import { NotebookSpecsForm } from './components/NotebookSpecsForm';
import { WeeklyUsageForm } from './components/WeeklyUsageForm';
import { ResultsReport } from './components/ResultsReport';
import type { ResultsData } from './types';
import { ARGENTINA_EMISSION_FACTOR, TREE_CO2_ABSORPTION } from './constants';

type Step = 'intro' | 'specs' | 'usage' | 'results';

const App: React.FC = () => {
    const [step, setStep] = useState<Step>('intro');
    const [notebookPower, setNotebookPower] = useState<number>(65);
    const [dailyUsage, setDailyUsage] = useState<number[]>(Array(7).fill(0));
    const [results, setResults] = useState<ResultsData | null>(null);

    const handleStart = useCallback(() => {
        setStep('specs');
    }, []);

    const handleSpecsSubmit = useCallback((power: number) => {
        setNotebookPower(power);
        setStep('usage');
    }, []);

    const handleUsageSubmit = useCallback((usage: number[]) => {
        setDailyUsage(usage);

        const totalWeeklyHours = usage.reduce((sum, hours) => sum + hours, 0);
        const dailyKWh = (notebookPower * totalWeeklyHours) / 7 / 1000;
        const weeklyKWh = dailyKWh * 7;
        const annualKWh = weeklyKWh * 52;
        const annualCO2eq = annualKWh * ARGENTINA_EMISSION_FACTOR;
        const treesNeeded = annualCO2eq / TREE_CO2_ABSORPTION;

        setResults({
            notebookPower,
            totalWeeklyHours,
            annualKWh: parseFloat(annualKWh.toFixed(2)),
            annualCO2eq: parseFloat(annualCO2eq.toFixed(2)),
            treesNeeded: parseFloat(treesNeeded.toFixed(2)),
        });

        setStep('results');
    }, [notebookPower]);

    const handleReset = useCallback(() => {
        setStep('intro');
        setNotebookPower(65);
        setDailyUsage(Array(7).fill(0));
        setResults(null);
        localStorage.removeItem('dailyUsage');
    }, []);
    
    const handleGoBackToSpecs = useCallback(() => {
        setStep('specs');
    }, []);

    const renderStep = () => {
        switch (step) {
            case 'intro':
                return <Introduction onStart={handleStart} />;
            case 'specs':
                return <NotebookSpecsForm onSubmit={handleSpecsSubmit} initialPower={notebookPower} />;
            case 'usage':
                return <WeeklyUsageForm onSubmit={handleUsageSubmit} onBack={handleGoBackToSpecs} />;
            case 'results':
                return results && <ResultsReport results={results} onReset={handleReset} />;
            default:
                return <Introduction onStart={handleStart} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <Header />
            <main className="w-full max-w-4xl mx-auto mt-8">
                {renderStep()}
            </main>
            <footer className="w-full max-w-4xl mx-auto mt-8 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Green Software - Herramienta de Asistencia</p>
            </footer>
        </div>
    );
};

export default App;