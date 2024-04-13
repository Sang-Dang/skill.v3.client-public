import Tedx2024 from '@/custom-components/event-page/tedx2024/Tedx2024';
import Header from '@/custom-components/Header';

export default function Home() {
    return (
        <div
            style={{
                overflowX: 'hidden',
            }}
        >
            <Header />
            <Tedx2024 />
        </div>
    );
}
