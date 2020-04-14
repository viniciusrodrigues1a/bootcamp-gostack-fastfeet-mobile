import React, { useState, useEffect, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import api from '~/services/api';

import ColoredContainer from '~/components/ColoredContainer';
import LoadingIcon from '~/components/LoadingIcon';

import {
  ProblemTitle,
  ProblemDescriptionContainer,
  ProblemDescription,
  ProblemDateContainer,
  ProblemDate,
} from './styles';

export default function Problems({ route }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = route.params;

  useEffect(() => {
    async function loadProblems() {
      setLoading(true);
      const response = await api.get('/problems');

      const data = response.data.payload.filter(p => p.delivery.id === id);

      setProblems(data);
      setLoading(false);
    }

    loadProblems();
  }, [id]);

  const getFormattedDate = useCallback(
    date => date && format(parseISO(date), "dd'/'MM'/'y"),
    []
  );

  return (
    <ColoredContainer.Container>
      <ColoredContainer.ContentWrapper>
        <ProblemTitle>Encomenda {id}</ProblemTitle>
        {loading ? (
          <LoadingIcon />
        ) : (
          (() => {
            if (problems.length > 0) {
              return problems.map(p => (
                <ColoredContainer.Content
                  key={String(p.id)}
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                >
                  <ProblemDescriptionContainer>
                    <ProblemDescription>{p.description}</ProblemDescription>
                  </ProblemDescriptionContainer>
                  <ProblemDateContainer>
                    <ProblemDate>{getFormattedDate(p.created_at)}</ProblemDate>
                  </ProblemDateContainer>
                </ColoredContainer.Content>
              ));
            }
            return (
              <ColoredContainer.Content>
                <ProblemDescriptionContainer>
                  <ProblemDescription style={{ color: '#000' }}>
                    Não há nenhum problema relacionado à esta entrega!
                  </ProblemDescription>
                </ProblemDescriptionContainer>
              </ColoredContainer.Content>
            );
          })()
        )}
      </ColoredContainer.ContentWrapper>
    </ColoredContainer.Container>
  );
}

Problems.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
