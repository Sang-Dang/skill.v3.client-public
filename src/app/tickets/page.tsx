import AboutHeader from '@/app/about/components/AboutHeader';
import TicketsList from '@/app/tickets/components/list';
import Footer from '@/common/components/Footer';

export default async function TicketsLoader() {
    // const queryClient = new QueryClient();

    // await queryClient.prefetchQuery({
    //     queryKey: qk_tickets.GetAllByProjectId(config.SetProject),
    //     queryFn: () => Tickets_GetAllByProjectId({ projectId: config.SetProject }),
    // });

    return (
        <>
            <AboutHeader />
            <TicketsList />
            <Footer />
        </>
    );
}
