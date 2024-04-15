import Tedx2024 from '@/custom-components/event-page/tedx2024/Tedx2024';
import Footer from '@/common/components/Footer';
import Header from '@/app/(homepage)/components/Header';

export default function Home() {
    return (
        <div
            style={{
                overflowX: 'hidden',
            }}
        >
            <Header />
            <Tedx2024 />
            <Footer />
        </div>
    );
}
