import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import 'testing-library/jest-dom/extend-expect';

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test("renders without crash;ing", () => {
  render(<AppFunctional />);
})

test ("test initial state", () => {
  render(<AppFunctional />);
  const headings = screen.getAllByRole("headings", {level: 3}).toHaveLength(3);

  expect(headings[0]).toHaveTextContent("Kordinatlar (2, 2)");

  expect(headings[1]).toHaveTextContent("0 kere ilerlediniz");

  expect(headings[2]).toHaveTextContent("");
})

test("test 6 buttons render", () => {
  render(<AppFunctional />);
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(6);
})