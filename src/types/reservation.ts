import { WithUserInfo } from '.';

/*
 * Notes:
 * 1. Types with suffix 'Output' represents the data structure of database schema
 * 2. Types with suffix 'Output' are never used in the front-end, This represents how Prisma builds the types
 * 3. Everytime that schemas are updated in the ´´schema.prisma´´ file, the 'Output' types must be updated in the front-end
 */

type ReservationOutput = {
	id: string;
	number_of_person: number;
	date_of_reservation: Date;
	status: string;
	created_at: Date;
	updated_at: Date | null;
	user_id: string;
	restaurant_id: string;
};

export type ReservationRecord = WithUserInfo<ReservationOutput>;
export type ReservationProps = Partial<ReservationOutput>;
export type ReservationDetailOutput = Pick<ReservationOutput, 'number_of_person' | 'date_of_reservation'>;
export type ReservationCreateInput = ReservationDetailOutput;
export type ReservationUpdateInput = Pick<ReservationOutput, 'status'>;

export interface MyReservationsQueryParams {
	status?: string;
	city?: string;
	search?: string;
	start_date?: string;
	end_date?: string;
}
