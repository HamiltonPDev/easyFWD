import { authorize } from "../../src/app/api/auth/authorize";
import UserModel from "../../src/models/User";

jest.mock("../../src/models/User");

describe("authorize", () => {
  const mockUser = {
    _id: "123",
    email: "test@test.com",
    passwordHash: "password123",
    role: "admin",
    comparePassword: jest.fn().mockResolvedValue(true),
  }

  beforeEach(() => {
      jest.clearAllMocks();
  });

  // Test:1 (Valid credentials)
  it("Returns user object for valid credentials", async () => {
    // Mock findByEmail to return the mock user
    (UserModel.findByEmail as jest.Mock).mockResolvedValue(mockUser);

    // Mock comparePassword to return true
    mockUser.comparePassword.mockResolvedValue(true);

    // Call authorize with valid credentials
    const result = await authorize({ email: "test@test.com", password: "password123" });

    // Assert that the result is the mock user object
    expect(result).toEqual({
        id: mockUser._id,
        email: mockUser.email,
        role: mockUser.role,
    })
  });

  // Test:2
  it("Throws error for missing credentials", async () => {
    await expect(authorize({ email: "", password: "" })).rejects.toThrow("Missing credentials");
  });

  // Test:3 (Invalid email format)
  it("Throws error for invalid email format", async () => {
    await expect(authorize({ email: "invalid-email", password: "admin1234" })).rejects.toThrow("Invalid email format");
  });

  // Test:4 (Invalid password format)
  it("Throws error for invalid password format", async () => {
    await expect(authorize({ email: "test@test.com", password: "123" })).rejects.toThrow("Invalid password");
  });

  // Test:5 (Non-existent user)
  it("Throws error for non-existent user", async () => {
    (UserModel.findByEmail as jest.Mock).mockResolvedValue(null);
    await expect(authorize({ email: "nonexistent@test.com", password: "password123" })).rejects.toThrow("No user found");
  });

  // Test:6 (Database connection error)
  it("Throws error for database connection error", async () => {
    (UserModel.findByEmail as jest.Mock).mockRejectedValue(new Error("Database connection error"));
  });

  // Test:7 comparePassword throws error
  it("Throws error if comparePassword throws an error", async () => {
    (UserModel.findByEmail as jest.Mock).mockResolvedValue(mockUser);
    mockUser.comparePassword.mockRejectedValue(new Error("Incorrect password"));
    await expect(authorize({ email: "test@test.com", password: "password123" })).rejects.toThrow("Incorrect password");
  });
})