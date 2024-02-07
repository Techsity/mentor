//! Still needs to be cleaned up

import { useCallback, useEffect, useMemo, useState } from "react";
import * as API from "../../services/api";
import { useRouter } from "next/router";
import { ICourse, IWorkshop } from "../../interfaces";
import { ParsedUrlQuery } from "querystring";
import { IMentor } from "../../interfaces/mentor.interface";
import countries from "../../data/countries";
import { IUser } from "../../interfaces/user.interface";

type OrderType = "asc" | "desc";
export const useAllCourses = (args?: { serverQuery?: ParsedUrlQuery }) => {
	const { serverQuery } = args || {};
	const router = useRouter();

	const [currentFilter, setCurrentFilter] = useState<"all-courses" | "date-created">("all-courses");

	const [order, setOrder] = useState<OrderType>("desc");
	const [courses, setCourses] = useState<Partial<ICourse>[]>([]);
	const [sortedCourses, setSortedCourses] = useState<Partial<ICourse>[]>([]); // original courses array

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [pagination, setPagination] = useState<{ limit: number; skip: number }>({
		limit: parseInt(serverQuery?.limit as string) || 10,
		skip: parseInt(serverQuery?.skip as string) || 0,
	});

	const [loading, setLoading] = useState<boolean>(true);

	const { limit, skip } = pagination;

	const fetchAllCourses = async () => {
		setLoading(true);

		try {
			const data = await API.fetchAllCourses();
			setCourses(data);
			setSortedCourses(data);
		} catch (err) {
			console.error("Error fetching all courses: ", err);
		} finally {
			scrollTo({ behavior: "smooth", top: 0 });
			setLoading(false);
		}
	};

	const changeOrder = () => {
		setOrder((p) => (p == "asc" ? "desc" : "asc"));
		router.push({ pathname: router.pathname, query: { ...router.query, order } });
	};

	useEffect(() => {
		scrollTo({ behavior: "smooth", top: 0 });
		fetchAllCourses();
	}, [pagination]);

	useEffect(() => {
		if (currentFilter === "date-created") {
			const sortedCourses = [...courses].sort((a: any, b: any) => {
				const dateA: any = new Date(a.created_at.split("/").reverse().join("/"));
				const dateB: any = new Date(b.created_at.split("/").reverse().join("/"));
				return dateB - dateA;
			});
			setSortedCourses(sortedCourses);
		} else if (currentFilter === "all-courses") {
			setSortedCourses(courses);
		}
	}, [currentFilter]);

	useEffect(() => {
		if (order === "asc") sortedCourses.reverse();
		else sortedCourses.reverse();
	}, [order]);

	const paginate = (page: number) => {
		if (!loading) {
			if (currentPage !== page) {
				setPagination((p) => {
					return { limit: p.limit * page, skip: p.skip * page };
				});
				router.push({ pathname: router.pathname, query: { tab: "courses", page, skip, limit } });
				setCurrentPage(page);
			}
		}
	};

	return {
		order,
		changeOrder,
		loading,
		limit,
		skip,
		currentFilter,
		setCurrentFilter,
		coursesRecord: sortedCourses,
		paginate,
		currentPage,
	};
};

// ===========================================================

export const useAllWorkshops = (args?: { serverQuery?: ParsedUrlQuery }) => {
	const { serverQuery } = args || {};
	const router = useRouter();

	const [currentFilter, setCurrentFilter] = useState<IWorkshop["tag"] | "All">("All");

	const [order, setOrder] = useState<OrderType>((serverQuery?.order as OrderType) || "desc");
	const [workshops, setWorkshops] = useState<Partial<IWorkshop>[]>([]);
	const [originalArray, setOriginalArray] = useState<Partial<IWorkshop>[]>([]);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [pagination, setPagination] = useState<{ limit: number; skip: number }>({
		limit: parseInt(serverQuery?.limit as string) || 10,
		skip: parseInt(serverQuery?.skip as string) || 0,
	});

	const [loading, setLoading] = useState<boolean>(true);

	const { limit, skip } = pagination;

	const fetchAllWorkshops = async () => {
		setLoading(true);
		try {
			const data = await API.fetchAllWorkshops();
			setWorkshops(data);
			setOriginalArray(data);
		} catch (err) {
			console.error("Error fetching all workshops: ", err);
		} finally {
			setLoading(false);
			scrollTo({ behavior: "smooth", top: 0 });
		}
	};

	const changeOrder = () => {
		setOrder((p) => (p == "asc" ? "desc" : "asc"));
		router.push({ pathname: router.pathname, query: { ...router.query, order } });
	};

	useEffect(() => {
		scrollTo({ behavior: "smooth", top: 0 });
		fetchAllWorkshops();
	}, [pagination]);

	useEffect(() => {
		if (currentFilter !== "All") setWorkshops((w) => originalArray.filter((p) => p.tag === currentFilter));
		else setWorkshops(originalArray);
	}, [currentFilter]);

	useEffect(() => {
		if (order === "asc") workshops.reverse();
		else workshops.reverse();
	}, [order]);

	const paginate = (page: number) => {
		if (!loading)
			if (currentPage !== page) {
				setPagination((p) => {
					return { limit: p.limit * page, skip: p.skip * page };
				});
				router.push({ pathname: router.pathname, query: { tab: "workshops", page, skip, limit } });
				setCurrentPage(page);
			}
	};

	return {
		order,
		changeOrder,
		loading,
		limit,
		skip,
		currentFilter,
		setCurrentFilter,
		workshops,
		paginate,
		currentPage,
	};
};

// ===========================================================

export const useAllMentors = (args?: { serverQuery?: ParsedUrlQuery }) => {
	const { serverQuery } = args || {};
	const router = useRouter();

	const [order, setOrder] = useState<OrderType>((serverQuery?.order as OrderType) || "desc");
	const [mentors, setMentors] = useState<Partial<IMentor>[]>([]);
	const [originalArray, setOriginalArray] = useState<Partial<IMentor>[]>([]);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [pagination, setPagination] = useState<{ limit: number; skip: number }>({
		limit: parseInt(serverQuery?.limit as string) || 10,
		skip: parseInt(serverQuery?.skip as string) || 0,
	});

	const [loading, setLoading] = useState<boolean>(true);

	const { limit, skip } = pagination;

	const filter = useMemo(() => String(serverQuery?.country).toLowerCase() || "all-countries", [serverQuery?.country]);

	const fetchMentorData = async () => {
		setLoading(true);
		try {
			const data = await API.fetchAllMentors();
			setMentors(() => {
				return data.filter((m) => m.user?.country.toLowerCase() === filter);
			});
			if (!filter || filter == "undefined") setMentors(data);
			setOriginalArray(data);
		} catch (err) {
			console.error("Error fetching all mentors: ", err);
		} finally {
			setLoading(false);
			scrollTo({ behavior: "smooth", top: 0 });
		}
	};

	const changeOrder = () => {
		setOrder((p) => (p == "asc" ? "desc" : "asc"));
		router.push({ pathname: router.pathname, query: { ...router.query, order } });
	};

	const changeCountryFilter = (country?: string) => {
		if (country)
			router.push({
				pathname: router.pathname,
				query: { ...router.query, order, country: String(country).toLowerCase() },
			});
		else {
			router.push({
				pathname: router.pathname,
				query: { ...router.query, order, country: filter.toLowerCase() },
			});

			setMentors((w) =>
				originalArray.filter((p) => {
					const filteredCountry = countries.find(
						(cntry) =>
							cntry.label.toLowerCase() == filter.toLowerCase() ||
							cntry.countryCode.toLowerCase() == filter.toLowerCase(),
					);
					const selectedMentors =
						p.user?.country.toLowerCase() == filteredCountry?.label.toLowerCase() ||
						p.user?.country.toLowerCase() == filteredCountry?.countryCode.toLowerCase();

					return selectedMentors;
				}),
			);
		}
	};

	useEffect(() => {
		scrollTo({ behavior: "smooth", top: 0 });
		fetchMentorData();
	}, [pagination]);

	useEffect(() => {
		if (filter.toLowerCase() === "all-countries" || !filter || filter == "undefined") setMentors(originalArray);
		else changeCountryFilter();
	}, [filter]);

	useEffect(() => {
		if (order === "asc") mentors.reverse();
		else mentors.reverse();
	}, [order]);

	const paginate = (page: number) => {
		if (!loading)
			if (currentPage !== page) {
				setPagination((p) => {
					return { limit: p.limit * page, skip: p.skip * page };
				});
				router.push({ pathname: router.pathname, query: { tab: "mentors", page, skip, limit } });
				setCurrentPage(page);
			}
	};

	return {
		order,
		changeOrder,
		loading,
		limit,
		skip,
		currentFilter: filter,
		changeCountryFilter,
		mentors,
		paginate,
		currentPage,
	};
};

// ===========================================================

export const useAllUsers = (args?: { serverQuery?: ParsedUrlQuery }) => {
	const { serverQuery } = args || {};
	const router = useRouter();

	const [order, setOrder] = useState<OrderType>((serverQuery?.order as OrderType) || "desc");
	const [users, setUsers] = useState<Partial<IUser>[]>([]);
	const [originalArray, setOriginalArray] = useState<Partial<IUser>[]>([]);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [pagination, setPagination] = useState<{ limit: number; skip: number }>({
		limit: parseInt(serverQuery?.limit as string) || 10,
		skip: parseInt(serverQuery?.skip as string) || 0,
	});

	const [loading, setLoading] = useState<boolean>(true);

	const { limit, skip } = pagination;

	const filter = useMemo(() => String(serverQuery?.country).toLowerCase() || "all-countries", [serverQuery?.country]);

	const fetchMentorData = async () => {
		setLoading(true);
		try {
			const data = await API.fetchAllUsers();
			setUsers(() => {
				return data.filter((user) => (user as IUser).country.toLowerCase() === filter);
			});
			if (!filter || filter == "undefined") setUsers(data);
			setOriginalArray(data);
		} catch (err) {
			console.error("Error fetching all users: ", err);
		} finally {
			setLoading(false);
			scrollTo({ behavior: "smooth", top: 0 });
		}
	};

	const changeOrder = () => {
		setOrder((p) => (p == "asc" ? "desc" : "asc"));
		router.push({ pathname: router.pathname, query: { ...router.query, order } });
	};

	const changeCountryFilter = (country?: string) => {
		if (country)
			router.push({
				pathname: router.pathname,
				query: { ...router.query, order, country: String(country).toLowerCase() },
			});
		else {
			router.push({
				pathname: router.pathname,
				query: { ...router.query, order, country: filter.toLowerCase() },
			});

			setUsers((w) =>
				originalArray.filter((user) => {
					const filteredCountry = countries.find(
						(cntry) =>
							cntry.label.toLowerCase() == filter.toLowerCase() ||
							cntry.countryCode.toLowerCase() == filter.toLowerCase(),
					);
					const selectedUsers =
						user?.country?.toLowerCase() == filteredCountry?.label.toLowerCase() ||
						user?.country?.toLowerCase() == filteredCountry?.countryCode.toLowerCase();

					return selectedUsers;
				}),
			);
		}
	};

	useEffect(() => {
		scrollTo({ behavior: "smooth", top: 0 });
		fetchMentorData();
	}, [pagination]);

	useEffect(() => {
		if (filter.toLowerCase() === "all-countries" || !filter || filter == "undefined") setUsers(originalArray);
		else changeCountryFilter();
	}, [filter]);

	useEffect(() => {
		if (order === "asc") users.reverse();
		else users.reverse();
	}, [order]);

	const paginate = (page: number) => {
		if (!loading)
			if (currentPage !== page) {
				setPagination((p) => {
					return { limit: p.limit * page, skip: p.skip * page };
				});
				router.push({ pathname: router.pathname, query: { tab: "users", page, skip, limit } });
				setCurrentPage(page);
			}
	};

	return {
		order,
		changeOrder,
		loading,
		limit,
		skip,
		currentFilter: filter,
		changeCountryFilter,
		users,
		paginate,
		currentPage,
	};
};
