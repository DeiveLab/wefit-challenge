import { container as tsyringeContainer } from "tsyringe";
import { UsersRepository } from "../../repositories/impls/UsersRepository";
import { UsersAddressRepository } from "../../repositories/impls/UsersAddressRepository";

tsyringeContainer.registerSingleton("IUsersRepository", UsersRepository);
tsyringeContainer.registerSingleton("IUsersAddressRepository", UsersAddressRepository);

export const container = tsyringeContainer;