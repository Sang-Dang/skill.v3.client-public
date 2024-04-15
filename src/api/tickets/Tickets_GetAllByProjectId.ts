import { instance } from '@/api/default.axios';
import { transformRes } from '@/api/utils';
import { TicketModel } from '@/lib/model/ticket.model';

type Request = {
    projectId: string;
};
type Response = TicketModel[];

export async function Tickets_GetAllByProjectId(req: Request) {
    return instance
        .get<Response>('/ticket-user', {
            transformResponse: [
                (data) =>
                    transformRes(data, (res) => {
                        return TicketModel.fromJSONList(res.data);
                    }),
                (res) => {
                    return res.filter((ticket: TicketModel) => ticket.project === req.projectId);
                },
            ],
        })
        .then((res) => res.data);
}
