import { fetcher, randomHexColor } from './utils';

describe('utils', () => {
    describe('fetcher', () => {
        it('should return JSON data on successful fetch', async () => {
            // Mock fetch for testing
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ data: 'test' }),
                })
            ) as jest.Mock;

            const result = await fetcher('https://api.example.com/test');
            expect(result).toEqual({ data: 'test' });
        });

        it('should throw error on failed fetch', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: false,
                    status: 404,
                })
            ) as jest.Mock;

            await expect(fetcher('https://api.example.com/test')).rejects.toThrow('An error occurred while fetching the data.');
        });
    });

    describe('randomHexColor', () => {
        it('should return a valid hex color', () => {
            const color = randomHexColor();
            expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
        });

        it('should return different colors on multiple calls', () => {
            const color1 = randomHexColor();
            const color2 = randomHexColor();
            expect(color1).not.toBe(color2);
        });
    });
});
