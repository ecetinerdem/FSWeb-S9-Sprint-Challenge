import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import 'testing-library/jest-dom/extend-expect';

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test("renders without crash;ing", () => {
  render(<AppFunctional />)
})

test ("test initial state", () => {
  render(<AppFunctional />)
  const headings = screen.getAllByRole("headings", {level: 3}).toHaveLength(3);
  expect(headings[0]).toHave
})
