const BASE =
    process.env.NEXT_PUBLIC_API_BASE ?? 'http://192.168.50.186:8000/api/v1/';

interface ApiOptions extends RequestInit {
    params?: Record<string, string | number | boolean | undefined | null>;
}

type ApiInput = string | URL | Request;

async function api<T>(input: ApiInput, init?: ApiOptions): Promise<T> {
    let url =
        typeof input === 'string' && !input.startsWith('http')
            ? `${BASE}${input}`
            : input;

    // 🧩 Nếu có params -> tự thêm query string
    if (init?.params && typeof url === 'string') {
        const searchParams = new URLSearchParams();
        Object.entries(init.params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
            }
        });

        const separator = url.includes('?') ? '&' : '?';
        url = `${url}${separator}${searchParams.toString()}`;
    }
    const token: string | null = localStorage
        ? localStorage.getItem('access_token')
        : null;

    const isFormData = init?.body instanceof FormData;
    const res = await fetch(url, {
        ...init,
        headers: {
            ...(isFormData ? {} : {'Content-Type': 'application/json'}),
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
            ...(init?.headers || {}),
        },
    });
    if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(errText || `HTTP ${res.status}`);
    }
    return res.json() as Promise<T>;
}

export default api;

export async function apiWithLogin<T>(
    input: ApiInput,
    init?: RequestInit
): Promise<T> {
    const url =
        typeof input === 'string' && !input.startsWith('http')
            ? `${BASE}${input}`
            : input;
    const isFormData = init?.body instanceof FormData;
    const res = await fetch(url, {
        ...init,
        headers: {
            ...(isFormData ? {} : {'Content-Type': 'application/json'}),
            ...(init?.headers || {}),
        },
    });
    if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(errText || `HTTP ${res.status}`);
    }

    //
    // const cookieStore = await cookies();
    //
    // // Lưu access token: ngắn hạn (vd 15 phút)
    // cookieStore.set('access_token', accessToken, {
    //   httpOnly: true,
    //   secure: true, // bật HTTPS production
    //   sameSite: 'lax',
    //   path: '/',
    //   maxAge: 60 * 15, // 15 phút
    // });
    //
    // // Lưu refresh token: dài hạn hơn (vd 7 ngày)
    // cookieStore.set('refresh_token', refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'lax',
    //   path: '/',
    //   maxAge: 60 * 60 * 24 * 7, // 7 ngày
    // });

    return (await res.json()) as Promise<T>;
}
