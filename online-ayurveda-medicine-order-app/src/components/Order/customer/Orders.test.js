import {render,screen,cleanup} from '@testing-library/react'
import Orders from './Orders'
test('should render orders ', () => {
    render(<Orders/>)
    const ele =screen.getByTestId('orders');
    expect(ele).toBeInTheDocument();
    // expect(true).toBe(false)
})
