import { describe, expect, it } from "vitest";
import { calculateFinancing, formatBRL } from "./financing";

describe("calculateFinancing", () => {
  it("divides the balance evenly without implying interest", () => {
    const result = calculateFinancing(149_900, 25_000, 48);
    expect(result.financedAmount).toBe(124_900);
    expect(result.monthlyPayment).toBeCloseTo(124_900 / 48, 8);
    expect(result.totalAmount).toBeCloseTo(124_900, 8);
  });

  it("returns zero when the entry covers the vehicle price", () => {
    expect(calculateFinancing(50_000, 50_000, 36)).toEqual({
      financedAmount: 0,
      monthlyPayment: 0,
      totalAmount: 0,
    });
  });

  it("clamps entry and protects against invalid terms", () => {
    expect(calculateFinancing(10_000, 15_000, 24).financedAmount).toBe(0);
    expect(calculateFinancing(10_000, 2_000, 0).monthlyPayment).toBe(0);
    expect(calculateFinancing(Number.NaN, 0, 12).totalAmount).toBe(0);
  });
});

describe("formatBRL", () => {
  it("formats values in Brazilian reais", () => {
    expect(formatBRL(1200)).toContain("1.200");
    expect(formatBRL(1200)).toContain("R$");
  });
});
