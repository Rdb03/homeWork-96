import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../users/usersSlice.ts';
import React, { useEffect, useState } from 'react';
import { createCocktail, fetchCocktails } from '../CocktailThunk.ts';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { CocktailMutation, IIngredients } from '../../../../types';
import { LoadingButton } from '@mui/lab';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import { selectCreateLoading } from '../CocktailSlice.ts';
import SendIcon from '@mui/icons-material/Send';


const CocktailForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectCreateLoading);

  const [state, setState] = useState<CocktailMutation>({
    name: '',
    image: null,
    recipe: '',
    user: '',
  });

  const [ingState, setIngState] = useState<IIngredients[]>(
    [{nameIng: '', qty: ''},]
  );

  console.log(ingState);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(fetchCocktails());
  }, [dispatch, user, navigate]);

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const data = [...ingState];
    data[index][event.target.name as keyof IIngredients] = event.target.value;
    setIngState(data);
  }

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      try {
        const obj: CocktailMutation = {
          name : state.name,
          recipe: state.recipe,
          image: state.image,
          ingredients: ingState,
          user: user._id,
        }

        const token = user.token
        await dispatch(createCocktail({cocktailMutation: obj, token})).unwrap();
        navigate('/');
    } catch (e) {
      alert('Invalid field');
    }}
  };

  const addInputField = ()=>{
    setIngState([...ingState, {nameIng: '', qty: ''}])
  }

  const removeFields = (index: number) => {
    const data = [...ingState];
    data.splice(index, 1)
    setIngState(data);
  }

  return (
    <Grid sx={{display: 'flex', flexDirection: 'column'}}>
      <form autoComplete="off" onSubmit={submitFormHandler} style={{ width: '100%' }}>
        <Typography sx={{margin: '0 auto'}} variant="h3">Add New Cocktail</Typography>
        <Grid>
          <TextField
            required
            sx={{ width: '100%', background: 'white', borderRadius: 2, marginTop: "50px"}}
            id="name"
            label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
          />
          {ingState.map((element, index) => (
            <Grid sx={{display: 'flex', alignItems: 'center', padding: '10px 10px 10px 0', margin: '0 auto'}}
                  key={index}>
              <Grid>
                <label style={{color: 'white', display: 'block', marginBottom: '10px'}}>Ingredient Name</label>
                <TextField
                  required
                  sx={{width: '100%', background: 'white', borderRadius: 2}}
                  id="nameIng"
                  label="Ingredient Name"
                  value={element.nameIng}
                  onChange={e => handleFormChange(index, e)}
                  name="nameIng"
                />
              </Grid>
              <Grid sx={{marginLeft: '20px'}}>
                <label style={{color: 'white', display: 'block', marginBottom: '10px'}}>Amount</label>
                <TextField
                  required
                  sx={{width: '100%', background: 'white', borderRadius: 2}}
                  id="qty"
                  label="Ingredient Amount"
                  value={element.qty}
                  onChange={e => handleFormChange(index, e)}
                  name="qty"
                />
              </Grid>
              {
                index ?
                  <Button type="button"
                          sx={{color: 'white', marginLeft: '20px', marginTop: '25px'}}
                          variant="contained"
                          onClick={() => removeFields(index)}>Remove</Button>
                  : <Grid sx={{width: '100px', marginLeft: '10px'}}></Grid>
              }
            </Grid>
          ))}
          <Button variant="contained"
                  onClick={addInputField}
                  sx={{marginTop: '20px'}}
          >+ Add Ingredient
          </Button>

          <Grid item xs>
            <TextField
              required
              sx={{ width: '100%', background: 'white', borderRadius: 2, marginTop: '40px'}}
              id="recipe"
              label="Recipe"
              value={state.recipe}
              onChange={inputChangeHandler}
              name="recipe"
            />
          </Grid>

          <Grid sx={{marginTop: '30px'}} item xs>
            <FileInput onChange={filesInputChangeHandler} name="image" label="image" />
          </Grid>

          <Grid item xs>
            <LoadingButton
              type="submit"
              size="small"
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              sx={{marginTop: '50px'}}
            >
              {' '}
              <span>Send</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default CocktailForm;