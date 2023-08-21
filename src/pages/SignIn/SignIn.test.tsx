import { render, screen } from '@testing-library/react';
import { Component } from '.';
import ProvidersWrapper from '@root/testUtils/ProvidersWrapper';

describe('<SignIn />', () => {
  test('should render correctly', () => {
    render(<ProvidersWrapper><Component /></ProvidersWrapper>)

    expect(screen.getByRole('heading', { name: 'Track your order' })).toBeInTheDocument();
  })
})
