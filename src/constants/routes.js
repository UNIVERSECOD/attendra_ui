export const PAGE_PATHS = {
  dashboard: "/dashboard",
  employees: "/employees",
  groups: "/groups",
  departments: "/departments",
  positions: "/positions",
  attendance: "/attendance/flexible",
  timetable: "/timetable",
  permissions: "/permissions",
  tabel: "/tabel",
  devices: "/devices",
  access: "/access",
  settings: "/settings",
};

export const ATTENDANCE_TABS = ["flexible", "standard", "normal"];

export function getPagePath(pageKey) {
  return PAGE_PATHS[pageKey] || PAGE_PATHS.devices;
}

export function getAttendancePath(tabKey = "flexible") {
  const safeTab = ATTENDANCE_TABS.includes(tabKey) ? tabKey : "flexible";
  return `/attendance/${safeTab}`;
}

export function getEmployeeCreatePath() {
  return "/employees/create";
}

export function getEmployeeDetailPath(employeeId) {
  return `/employees/${employeeId}`;
}

export function getEmployeeEditPath(employeeId) {
  return `/employees/${employeeId}/edit`;
}

export function parseRoute(pathname) {
  const normalizedPath = pathname === "/" ? PAGE_PATHS.devices : pathname;
  const segments = normalizedPath.split("/").filter(Boolean);

  if (segments[0] === "employees") {
    if (segments[1] === "create") {
      return { pageKey: "employees", subPage: "create", pathname: normalizedPath };
    }

    if (segments[1] && segments[2] === "edit") {
      return {
        pageKey: "employees",
        subPage: "edit",
        entityId: Number(segments[1]),
        pathname: normalizedPath,
      };
    }

    if (segments[1]) {
      return {
        pageKey: "employees",
        subPage: "detail",
        entityId: Number(segments[1]),
        pathname: normalizedPath,
      };
    }

    return { pageKey: "employees", subPage: "list", pathname: normalizedPath };
  }

  if (segments[0] === "attendance") {
    return {
      pageKey: "attendance",
      subPage: ATTENDANCE_TABS.includes(segments[1]) ? segments[1] : "flexible",
      pathname: normalizedPath,
    };
  }

  const pageKey = Object.entries(PAGE_PATHS).find(([, path]) => path === normalizedPath)?.[0];
  return {
    pageKey: pageKey || "devices",
    subPage: "index",
    pathname: normalizedPath,
  };
}
