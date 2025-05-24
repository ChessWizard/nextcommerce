import { redirect } from "next/navigation";

export const navigate = (
  path: string,
  options: {
    target?: "_self" | "_blank" | "_parent" | "_top";
    replace?: boolean;
  } = {}
) => {
  const { target = "_self", replace = false } = options;

  if (typeof window === "undefined") {
    redirect(path);
    return;
  }

  if (target === "_blank") {
    window.open(path, "_blank");
    return;
  }

  try {
    import("next/navigation").then(({ useRouter }) => {
      const router = useRouter();
      if (replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
    }).catch(() => {
      if (replace) {
        window.location.replace(path);
      } else {
        window.location.href = path;
      }
    });
  } catch {
    if (replace) {
      window.location.replace(path);
    } else {
      window.location.href = path;
    }
  }
};