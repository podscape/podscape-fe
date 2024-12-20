import { NeonSpinner } from './components/LoadingSpinner';

export default function Loading() {
    return (
        <div className="loading-overlay">
            <div className="spinner-container">
                <NeonSpinner />
                <div className="text-[#0ff] font-medium animate-pulse">
                    Loading Story...
                </div>
            </div>
        </div>
    );
}
