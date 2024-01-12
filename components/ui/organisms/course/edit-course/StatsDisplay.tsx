import { FC } from "react";
import { formatAmount } from "../../../../../utils";
import { StarRatingIcon } from "../../../atom/icons/svgs";

type StatsProps = {
	stats?: { totalStudent?: number | 0; totalWatchHour?: number | 0; totalRatings: number | 0 } | null;
};

const StatsDisplay: FC<StatsProps> = ({ stats }) => {
	const { totalStudent, totalWatchHour, totalRatings } = stats || {};
	return (
		<>
			{stats ? (
				<>
					<div className="bg-[#70C5A1] p-3 px-5 items-center flex justify-between text-white">
						<span className="text-sm">Total Students</span>
						<span className="">{formatAmount(totalStudent as number)}</span>
					</div>
					<div className="bg-[#70C5A1] p-3 px-5 items-center flex justify-between text-white">
						<span className="text-sm">Total Watch Hour</span>
						<span className="">{formatAmount(totalWatchHour as number)}hrs</span>
					</div>
					<div className="bg-[#70C5A1] p-3 px-5 items-center flex justify-between text-white">
						<span className="text-sm">Total Total Ratings</span>
						<span className="flex items-center gap-1">
							{totalRatings as number}
							<StarRatingIcon className="-mt-1" opacity={1} color="#fff" height={15} width={15} />
						</span>
					</div>
				</>
			) : (
				<h1 className="text-sm text-[#70C5A1] font-medium text-center flex items-start justify-center">
					Nothing to show here
				</h1>
			)}
		</>
	);
};
export default StatsDisplay;
