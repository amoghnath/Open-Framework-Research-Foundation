import React, { useEffect, useState } from 'react';
import { useSnackbar } from '../context/SnackBarContext';

const SolutionsList = () => {
    const [solutions, setSolutions] = useState([]);
    const { openSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchSolutions = async () => {
            try {
                const response = await fetch('/api/solution', {
                    method: 'GET',
                    credentials: 'include' // Ensures cookies, such as the JWT, are sent with the request
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch solutions');
                }

                const data = await response.json();
                setSolutions(data);
            } catch (error) {
                console.error('Error fetching solutions:', error);
                openSnackbar(error.message || 'Error fetching solutions');
            }
        };

        fetchSolutions();
    }, [openSnackbar]);

    return (
        <div>
            <h1>My Solutions</h1>
            <ul>
                {solutions.map((solution) => (
                    <li key={solution.solutionId}>
                        <h2>{solution.solutionTitle}</h2>
                        <p>{solution.solutionDescription}</p>
                        <h3>Problem Details</h3>
                        <p>Title: {solution.Problem.problemTitle}</p>
                        <p>Description: {solution.Problem.problemDescription}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SolutionsList;
